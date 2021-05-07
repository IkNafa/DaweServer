import Moment from "react-moment";
import Button from "./Button.js";

const Table = ({list, onDismiss}) => {
    return (
        <div className="table">
            {list.map(item => {
                return <div key={item.objectID} className="table-row">

                   <span style={{ width: '40%' }}>
                  <a href={item.url}>{item.title}</a>
                </span>
                    <span style={{ width: '30%' }}>
                  {item.author}
                </span>
                    <span style={{ width: '10%' }}>
                  <Moment fromNow>{item.created_at}</Moment>
                </span>
                    <span style={{ width: '10%' }}>
                  <Button
                      onClick={() => onDismiss(item.objectID)}
                      className="button-inline"
                  >
                    Dismiss
                  </Button>
                       </span>

                </div>;
            })}
        </div>
    );
}

export default Table;