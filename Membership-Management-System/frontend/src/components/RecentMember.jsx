import '../styles/RecentMember.css'

export default function RecentMember(props){
    return (
        <>
            <div className="recent-member-card">
                <img src={props.img} alt="" className="member-card-img" />

                <div className="memeber-desc">
                    <h5 className="name">{props.name}</h5>
                    <p className="mem-num">Membership Number: {props.memNum}</p>
                </div>

                <div className="mem-type">{props.memType}</div>
            </div>

        </>
    )
}