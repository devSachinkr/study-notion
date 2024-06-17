export const formatedDate=(dateString)=>{
    const options={year:'numeric',month:"long",day:"numeric"}
    const date=new Date(dateString)
    const formatDate=date.toLocaleDateString("en-US",options)

    const hour =date.getHours()
    const minutes=date.getMinutes()
    const period=hour>=12?"PM":"AM"
    const formatTime=`${hour % 12}:${minutes.toString().padStart(2,"0")} ${period}`
    return `${formatDate} | ${formatTime}`
}