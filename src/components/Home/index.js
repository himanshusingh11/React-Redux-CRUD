import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Home = () => {
  const contacts = useSelector((state)=>state);

  const dispatch = useDispatch();
  const [searchTxt,setSearchTxt] = useState('');
  const [filterContact,setFilterContact] = useState([]);
  const [allContacts,setAllContacts] = useState([]);
  const filterData = (searchTxt, contacts) => {
    searchTxt = searchTxt.toLowerCase();
    console.log(contacts.filter((item) => item?.name?.toLowerCase().includes(searchTxt)))
    return contacts.filter((item) => item?.name?.toLowerCase().includes(searchTxt));
  };
  

  useEffect(() => {
    if (searchTxt === "") {
      setFilterContact(allContacts);
    }
  }, [searchTxt]);
  useEffect(()=>{
    setAllContacts(contacts);
    setFilterContact(contacts);
  },[contacts]);

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
          Add Contact
        </Link>
        <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
        />
        <button
          className="search-btn"
          onClick={() => {
            const data = filterData(searchTxt, allContacts);
            setFilterContact(data);
          }}
        >
          Search
        </button>
      </div>

        <div className="col-md-12 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterContact.length > 0 ? (
                                
                filterContact.map((contact, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <Link
                        to={`/edit/${contact.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => {dispatch({ type: "DELETE_CONTACT", payload: contact.id });
                        toast.success("Contact Deleted !!")}}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No contacts found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};




export default Home;
