
import {  useEffect, useState } from 'react';
import './App.css';
import { UserCard } from './UserCard';
import { SearchHeader } from './SearchHeader';



function App() {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [filterData,setFilterData] = useState([]);
 
  
  
 /* useEffect(() => {
    
    const fetchData = async () => {
      try {
        if (page > 4) return;
        const response = await fetch(`https://randomuser.me/api/?results=10&page=${page}&inc=name,email`);
        const data = await response.json();
        const newUsers = data.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          image: `https://robohash.org/${user.name.first.toLowerCase()}.png?set=set1&size=150x150`
        }));
        setUsers(prevUsers => [...prevUsers, ...newUsers]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  }, [page]); */
  useEffect(() => {
    const fetchData = () => {
      if (page > 2) return;
      fetch(`https://randomuser.me/api/?results=10&page=${page}&inc=name,email`)
        .then(response => response.json())
        .then(data => {
          const newUsers = data.results.map(user => ({
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            image: `https://robohash.org/${user.name.first.toLowerCase()}.png?set=set1&size=150x150`
          }));
          setUsers(prevUsers => [...prevUsers, ...newUsers]);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
    fetchData();
  }, [page]);


  useEffect(() => {
    setFilterData(users);
  }, [users]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if(searchTerm === ''){
      setFilterData(users)
    }else{
    const filteredData = users.filter(user => user.name.toLowerCase().includes(searchTerm));
    setFilterData(filteredData);}
  };
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
    if (scrollPercentage > 70) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);
 
  return (
    <>
    <div className="app">
     <SearchHeader handleSearch = {handleSearch} />
      <div className="user-cards">
        {filterData.map((user, index) => (
          <UserCard
            key={index}
            name={user.name}
            email={user.email}
            image={user.image}
          />
        ))}
       
      </div>
      
    </div>
    </>
  );
};
export default App;
