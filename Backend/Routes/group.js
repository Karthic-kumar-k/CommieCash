const {group, groupUserMapping}  = require('../Controllers')
const {models : {User}} =require('../Models')
const {sendSuccessResponse, sendInternalServerErrorResponse} = require('../Middlewares/responseHandlers')

module.exports = function (app){
  app.post("/group/create" , async (req, res) => {
    try{
      const request = req.body
      const groupName = request.group_name,
            usersIdList = request.users_id_list,
            groupType = request.group_type,
            creatorId = request.user_id,
            description = request.description;

      const userObj = await User.findByPk(creatorId);

      if(!userObj)
        throw new Error(`User with id ${creatorId} not found`);

      await group.create(groupName, groupType, description, userObj.name, userObj.name, async (err,groupId) => {
        if(err)
          throw err;
        else {
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
          res.status(200).json(sendSuccessResponse("group created successfully"));
        }
      })
    }
    catch(err){
        res.status(500).json(sendInternalServerErrorResponse(err.message));
    }
  })


  app.delete("/group/delete" , async (req, res) => {
    const groupId = req.body.group_id;
    await group.delete(groupId, async (deleteErr,msg) => {
      if(deleteErr)
        res.status(500).json(sendInternalServerErrorResponse(deleteErr.message));
      else {
        res.status(200).json(sendSuccessResponse(msg));
      }
    })
  })


  app.get("/group/get" , async (req, res) => {
    const userId = req.body.user_id;
    await groupUserMapping.getGroupsForUser(userId, async (getErr,msgList) => {
      if(getErr)
        res.status(500).json(sendInternalServerErrorResponse(getErr.message));
      else {
        const resp = []
        for (const msg of msgList){
          var t = {
          "id": msg.id,
          "name": msg.name,
          "type": msg.type,
          "description": msg.description,
          "createdBy": msg.createdBy,
          "createdAt": msg.createdAt,
          "modifiedBy": msg.modifiedBy
          }
          resp.push(t);
        }
        res.status(200).json(sendSuccessResponse(resp));
      }
    })
  })


  app.put("/group/update" , async (req, res) => {
    const groupId = req.body.group_id,
          updateBody = req.body.update_body;

    await group.update(groupId, updateBody, async (getErr,msg) => {
      if(getErr)
        res.status(500).json(sendInternalServerErrorResponse(getErr.message));
      else {
        res.status(200).json(sendSuccessResponse(msg));
      }
    })
  })

}
