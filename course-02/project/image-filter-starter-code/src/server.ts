import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  app.get( "/filteredimage", async ( req, res ) => {
    let image_url = req.query.image_url;
    if (image_url) {
      filterImageFromURL(image_url).then((response) => {
        res.sendFile(response);
        res.on('finish', function() {
          deleteLocalFiles([response]);
        });
      });
    } else {
      res.status(404).send("Please send the correct image_url");
    }
  });

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{https://elasticbeanstalk-us-east-1-442147658601.s3.us-east-1.amazonaws.com/server.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCWV1LXdlc3QtMiJHMEUCIBzyfCHQ3sme%2B41gHV6cNPiowHI5G566zHOH3VtmbFkFAiEAyqpGkTAB5iXs3t4KioCZp85csCMi7Bcihc2m129fOVAqhQMIdBAAGgw0NDIxNDc2NTg2MDEiDAGcbiZ8T7BecA69ririAl2kQoHAX63QHiFETHajA1TWtT6um8Pl5pQSFKQu6QHom57AwI%2BWP%2FXb4EvKkI7EXNrXHa9Z4mxl05umMkHeC2K1zufixeWerbaMhM1H7u9dHDk5PinlH1I00gci4eB2kiBvw06bnJoFDSPj4IH%2Ft8C31vT2BrWmgHOHLyYosrm4JCmIIStTZfUxBicq8bLLbnkDdDNt4uErdqpI1sMyA2ndeytnpW5qOIu0WnxvG9abk%2BQGoSU3iw0WBEJFUxBEoC%2BBHD8Cp1zC9ZVrEcXS35Sv4XmnNMd00sCWYBTc7MX9kA6MB47lC0o1zXoK3SDhw%2F15Ayaya85PWf9LSgg9KkP5A0pqgX65ab3y3i6fGuL8GsI%2F3hMe1AS%2BLH7Ym61NHbj49Efuo0p1kIV%2B5UTnRaGgfMIcrNEUNGUVh0N%2FT39nXQRhc3NB4In09Bu3393yGui392voR86vtfdvIfnJD%2B3ZwzCk5JycBjqHApcRz1g0cX%2Fs7joQt47hta8ldfdp7LUYD3Hv11B%2Fgi4voO%2F%2B5NRcV8h9XfoGX3%2BGnvcoGCIcNrH3pgYlxTiIrC8fqWRyTE4DsV8%2FW1kciNK%2BJ6J1GlZH1Q%2FB%2B5QR8wsVPlnhrXAXTwZ57bePSDPvHQd6cARc80T0ZaB%2FM4hS1oeg2OIrR8ZOKB6HEFv0kt2oI%2F1%2BTZGIIYZkWeDuDg0d4Ni9XqK7bcUbBBgCH2R6ze3jpXIIsf5ZPwsWYO16Fw27pIXYZ3st3UkZnZeXBR9swFMfSWAhYXeHxVc6dJarKeUD%2B9lPxnQ0A8zSYMY2l0jMDjUgRrYoDJR6BBE3GbdErOTEKJnizjh0&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221130T115314Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWN4QN3NUVPUPZB4N%2F20221130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1e400878e29e87fc6f210671b5c42c3663b98a3784e76fbd3ab4cb34e499f4b0}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();