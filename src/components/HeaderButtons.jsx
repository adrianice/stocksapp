export function HeaderButtons ({ logged, handleClickLogout }) {
    return (
        <>
            {
            logged.status
            ? 
            <>
            <h5 className="mx-2 my-auto">{logged.user.username}</h5>
            <button onClick={handleClickLogout} className="btn btn-secondary my-2 my-sm-0">Log out</button>
            </>
            : <a href="/login" className="btn btn-secondary my-2 my-sm-0">Log in</a>
        }
        </>
    )
}