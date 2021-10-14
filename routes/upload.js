const router = require('express').Router()
const https = require('https')
const dotenv = require('dotenv')

const User = require('../models/User')
const multerUploads = require('../middlewares/multerUpload')

dotenv.config()

router.route('/upload/:id').post(async (req, res) => {
    try {
        const extension = req.file.mimetype.split('/')[1]
        const uploadPic = await uploadFile(req.file.buffer, req.params.id, extension)
        const user = await User.findById(req.params.id)
            
        if (uploadPic && !user.profilePic) {
            const profilePicLink = await getFileLink(req.params.id, extension)
            user.profilePic = profilePicLink.split('?')[0]+"?raw=1" 
            await user.save()
            res.status(200).json({ "message": "upload successful" })
        } else { res.status(400).json({ "message": "upload was unsuccessful" }) }
    } catch(err) { res.status(500).json(err) } 
})



const uploadFile = (file, id, extension) => {

    const options = {
        hostname: "content.dropboxapi.com",
        path: "/2/files/upload",
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.DROPBOX_API_TOKEN}`,
            "Content-Type": "application/octet-stream",
            "Dropbox-API-Arg": JSON.stringify({
                "path": `/${id}.${extension}`,
                "property_groups": [],
                "mode": {".tag":"overwrite"}
            })
        }
    }

    return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            
            let response = ""
            res.on('data', d => {
                response += d
            })

            res.on('end', () => {
                resolve(true)
            })
        })

        req.on('error', error => {
            reject(console.error(error))
        })
        
        req.write(file)
        req.end()
    })
}


const getFileLink = (id, extension) => {
        
    const options = {
        hostname: 'api.dropboxapi.com',
        path: '/2/sharing/create_shared_link_with_settings',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.DROPBOX_API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    }

    return new Promise((resolve, reject) => {

        // make get request for shareable link
        const req = https.request(options, (res) => {

            let responseBody = ''
            res.on('data', function(d) {
                responseBody += d
            })

            res.on('end', () => {
                resolve(JSON.parse(responseBody).url) 
            })
        })

        req.on('error', (err) => {
            reject(console.log(error))
        })
  
        let data = JSON.stringify({
            "path": `/${id}.${extension}`,
            "settings": {
                "audience": "public",
                "access": "viewer"
            }
        })
        req.write(data)
        req.end()
    })
}

module.exports = router
