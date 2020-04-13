export default transcriptToAction = (transcription) => {
    if (transcription.includes("hello") || transcription.includes("hi") || transcription.includes("hey")) {
        return "hello"
    } else if (transcription.includes("eat") || transcription.includes("กิน")) {
        if (transcription.includes("apple") || transcription.includes("แอปเปิ้ล")) {
            return "eat_Apple"
        } else if (transcription.includes("pizza") || transcription.includes("พิซซ่า")) {
            return "eat_Pizza"
        } else {
            return 'confuse'
        }
    } else if (transcription.includes("ball") || transcription.includes("บอล")) {
        return "ball"
    } else if (transcription.includes("สวัสดี") || transcription.includes("ฮัลโหล") || transcription.includes("หวัดดี")) {
        return "สวัสดี"
    } else if (transcription.includes("bed") || transcription.includes("sleep")) {
        return "sleep"
    } else if (transcription.includes("นอน")) {
        return "นอน"
    } else {
            return 'confuse'
        }
    }