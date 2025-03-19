async function handleCreateBlog(req,res){
    return res.json({message:"Blog is created",createdby:req.id})
}

module.exports={handleCreateBlog};