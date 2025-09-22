const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /status:
 *   get:
 *     summary: Get server status
 *     description: Returns the running status of the server
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: string
 *                   example: Running
 */
router.get("/", (request, response) => {
  const status = {
    Status: "Running",
  };
  response.send(status);
});

module.exports = router;
