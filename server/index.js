const http = require('http')
const formidable = require('formidable')
const fs = require('fs')
const speech = require('@google-cloud/speech')
const ffmpeg = require('fluent-ffmpeg');

const client = new speech.SpeechClient()

const folderStoreName = 'uploads'
const port = 3005

http.createServer(function (req, res) {

    if (req.url == '/speech') {

        let form = new formidable.IncomingForm()

        form.parse(req, function (err, fields, files) {

            let name = files.file.name 
            let oldpath = files.file.path
            let newpath = __dirname + '/' + folderStoreName + '/' + name
            let lang = name.substring(
                name.lastIndexOf("_") + 1, 
                name.lastIndexOf(".")
            )
            
            fs.rename(oldpath, newpath, function (err) {
                if (err) console.log('error: ' + err)

                speechToText(newpath, lang, res)
            })
        })

    }
})
    .listen(port, () => {
        console.log('Server start port ' + port)
    })


let speechToText = async (newpath, lang, res) => {
    const audio = {
        content: fs.readFileSync(newpath),
    }
    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 41000,
        languageCode: lang,
    }
    const request = {
        audio: audio,
        config: config,
    }

    const [response] = await client.recognize(request)
    const transcription = await response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n')

    console.log(`Transcription: ${transcription}`)

    fs.unlinkSync(newpath)
    res.end(transcription)
}


/*
__MACOS__
export GOOGLE_APPLICATION_CREDENTIALS="./PetApp-4bd89c1e492c.json"

-------------------------------------------------------------------

__Windows__
$env:GOOGLE_APPLICATION_CREDENTIALS="./PetApp-4bd89c1e492c.json"
set GOOGLE_APPLICATION_CREDENTIALS=./PetApp-4bd89c1e492c.json
*/