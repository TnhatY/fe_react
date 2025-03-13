const TableUser = (props) => {
    const { listUser, handleClickBtnUpdate } = props;
    return (
        <>

            <div className="container mt-4">
                <h2>Danh sách người dùng</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser?.listUser?.map((item) => (
                            <tr key={item._id}>
                                <th scope="row">{item._id}</th>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>
                                    <button className="btn btn-info">View</button>
                                    <button className="btn btn-warning mx-3" onClick={() => handleClickBtnUpdate(item)}> Update</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    )
}
export default TableUser;