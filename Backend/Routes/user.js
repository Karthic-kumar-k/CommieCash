const {user, groupUserMapping}  = require('../Controllers')
const {sendSuccessResponse, sendInternalServerErrorResponse} = require('../Middlewares/responseHandlers')

module.exports = function (app){
  app.post("/user/create" , async (req, res) => {
    const userName = req.body.user_name;
    user.create(userName, userName, userName, function (err, result) {
      if(err)
        res.status(500).json(sendInternalServerErrorResponse(err.message));
      else {
        res.status(200).json(sendSuccessResponse(result));
      }
    })
  })

  app.post("/user/add", async(req, res) => {
    const groupId = req.body.group_id;
    const usersIdList = req.body.users_list;

    for (const uId of usersIdList) {
      try{
        await groupUserMapping.create(uId, groupId, async (e,_) => {
        if(e) throw e;
      })}
      catch(gumErr){
        res.status(500).json(sendInternalServerErrorResponse(gumErr.message));
        return ;
      }
    }
    res.status(200).json(sendSuccessResponse("users added to group successfully"));
  })


  app.delete("/user/remove", async(req, res) => {
    const groupId = req.body.group_id;
    const usersIdList = req.body.users_list;

    for (const uId of usersIdList) {
      try{
        await groupUserMapping.removeUserFromGroup(uId, groupId, async (e,_) => {
        if(e) throw e;
      })}
      catch(gumDeleteErr){
        res.status(500).json(sendInternalServerErrorResponse(gumDeleteErr.message));
        return ;
      }
    }
    res.status(200).json(sendSuccessResponse("users deleted from group successfully"));
  })


  app.get("/users/get" , async (req, res) => {
    const groupId = req.body.group_id;
    await groupUserMapping.getUsersInGroup(groupId, async (getErr,msgList) => {
      if(getErr)
        res.status(500).json(sendInternalServerErrorResponse(getErr.message));
      else {
        const resp = []
        for (const msg of msgList){
          var t = {
          "id": msg.id,
          "name": msg.name
          }
          resp.push(t);
        }
        res.status(200).json(sendSuccessResponse(resp));
      }
    })
  })

}
