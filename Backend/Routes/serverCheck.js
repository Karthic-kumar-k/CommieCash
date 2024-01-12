module.exports = function (app){
  app.get("/check" , async (_, res) => {
    res.send("SERVER UP");
  })
}
