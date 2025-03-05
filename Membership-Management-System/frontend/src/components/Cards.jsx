import '../styles/Card.css'

export default function Card(props){
    return(
        <>
            <div className="card">
                <div className="logo">{props.logo}</div>
                <div className="desc">
                    <p className="card-heading">{props.heading}</p>
                    <p className="count">{props.count}</p>
                </div>
            </div>
        </>
    )
}