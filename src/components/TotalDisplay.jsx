import { useSelector } from 'react-redux';
import { Card } from "reactstrap";

const TotalDisplay = () => {
    const rows = useSelector((state) => state.table.rows);
    const total = rows.reduce((acc, row) => acc + row.quantity * row.price, 0);

    return <div className="p-2">
        <Card>
            <div className="card-footer d-flex justify-content-between" >
                <div className=" badge text-secondary">TOTAL COST</div>
                <div className="text-center text-dark">
                    {total} <i className="bi bi-currency-rupee"></i>
                </div>
            </div>
        </Card>
    </div>
};

export default TotalDisplay;