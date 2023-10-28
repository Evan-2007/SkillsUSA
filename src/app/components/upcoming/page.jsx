export default async function Events (){

    const events = await fetch('/api/events')
    return(
        <div>
            <h1>Events</h1>
        </div>
    )
}