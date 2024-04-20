import { Row, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import UserCard from '../components/UserCard.component';
import user_img1 from '../assets/user_images/1.jpg';
import user_img2 from '../assets/user_images/2.jpg';
import user_img3 from '../assets/user_images/3.jpg';

import { landPlots } from '../assets/landPlots';


const usersList = [
  {
    pk: 1,
    firstName: 'Гліб',
    lastName: 'Пастушенко',
    phoneNumber: '+380975387715',
    photo: user_img3,
    landPlots: landPlots[0],
  },
  {
    pk: 2,
    firstName: 'Лариса',
    lastName: 'Сазонова',
    phoneNumber: '+380975387715',
    photo: user_img2,
    landPlots: landPlots[1],
  },
  {
    pk: 3,
    firstName: 'Данило',
    lastName: 'Семаньків',
    phoneNumber: '+380975387715',
    photo: user_img1,
    landPlots: landPlots[2],
  },
]


const Community = () => {
  // Form control states
  const [searchField, setSearchField] = useState('');

  // UI states
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Utiliti functions
  const getData = async () => {
    fetch('api/users')

    setUsers(usersList);
    setFilteredUsers(usersList);
  };

  const getFilteredUsers = (searchText) => {
    searchText = searchText.toLowerCase();

    const result = users.filter(user => {
      const name = `${user.firstName} ${user.lastName}`.toLowerCase();
      const plotNumbers = user.landPlots.map(landPlot => landPlot.number).join(' ');

      return name.includes(searchText) || plotNumbers.includes(searchText);
    })

    return result;
  }

  useEffect(() => {
    getData();
  }, []);


  // Form control handlers
  const searchChangeHandler = (e) => {
    setSearchField(e.target.value)

    setFilteredUsers(getFilteredUsers(e.target.value));
  }

  return (
    <div>
      <Form className="pt-3">
        <Form.Control
          type="text"
          placeholder="Пошук"
          value={searchField}
          className="mr-sm-2 "
          onChange={searchChangeHandler}
        />
      </Form>
      <Row className="pt-3 g-3">
        {filteredUsers.map(user => <UserCard key={user.pk} userInfo={user} />)}
      </Row>
    </div>
  )
}
export default Community
