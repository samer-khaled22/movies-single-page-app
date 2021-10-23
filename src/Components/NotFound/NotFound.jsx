import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
return (
<>
<div className="row justify-content-center align-items-center flex-column notfound">
<h2>Sorry, this page doesn't exist</h2>
<h4 className="mt-3"><Link to="/" className="text-primary">Home</Link></h4>
</div>
</>
)
}

export default NotFound
