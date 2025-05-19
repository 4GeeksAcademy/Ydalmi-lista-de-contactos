export const Card = () => {


    return (
        <div className="card mb-3" style={{ maxwidth: 540}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="..." className="img-fluid rounded-start " alt="..."/>
                </div>
                <div className="col-md-10">
                    <div className="card-body">
                        <h5 className="card-title"> nombre</h5>
                        <p clasName = "card-text position-absolute top-50 start-50 translate-middle"> direccion</p>
                        <p className="card-text"> telefono</p>
                        <p className="card-text"><small className="text-body-secondary">email</small></p>
                        <button className="btn btn-success justify-content-between">Add</button>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                    
                    </div>
                </div>
            </div>
        </div>


    )
}