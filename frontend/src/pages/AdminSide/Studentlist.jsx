import React, { useState, useEffect } from 'react';

import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import PublicAxios from '../../axios';
import axios from 'axios';
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import AdminNav from '../../Component/Navbar/AdminNav';
import { useSelector } from 'react-redux';



const TABLE_HEAD = ["Users", "Contact", "Status", "Joined at", "Actions"];


const ITEMS_PER_PAGE = 5; // Number of items to display per page


const Studentslist = () => {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [filtersTabs, setFiltersTabs] = useState([]);
  const [trigger, setTrigger] = useState(false)
  const authState = useSelector((state) => state.user)
  useEffect(() => {
    const userlistData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await PublicAxios.get('/admin/userlist');

        setUserList(response.data);
        setFiltersTabs(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    userlistData();
  }, [trigger]); 





  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  
  const filteredUserList = filtersTabs.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const slicedUserList = filteredUserList.slice(startIndex, endIndex);

 
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };


  
  const blockUser = async (userId) => {
    try {
      const response = await PublicAxios.put(`/admin/blockuser/${userId}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

     
      const updatedUserList = userList.map((user) => {
        if (user.id === userId) {
          
          return { ...user, is_active: false };
        }
        return user;
      });


      
      setUserList(updatedUserList);
      setTrigger(!trigger)
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  
  const handleUnblockUser = (userId) => {
    PublicAxios.put(`/admin/userunblock/${userId}/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        const updatedUserList = userList.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              is_active: true,
            };
          }
          return user;
        });
        setUserList(updatedUserList);
        setTrigger(!trigger)

      })
      .catch((error) => {
      });
  };


  return (
    <div className='bg-black'>


      <AdminNav />
      <Card className="h-full w-full pt-20">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="pl-6 flex justify-end w-full md:w-1/3 md:mt-1 items-center">
            <Input
              label="Search"
              title='search'
              placeholder='search'
              icon={<MagnifyingGlassIcon className="h-8 w-5" />}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 ">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}

                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slicedUserList.map(
                ({ id, username, email, phone, is_active, date_joined }, index) => {
                  const isLast = index === slicedUserList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  const joinedDate = new Date(date_joined);

                  const formattedDate = joinedDate.toLocaleDateString();

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">

                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {username}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {phone ?? 'no number'}
                          </Typography>

                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={is_active ? "active" : "in-active"}
                            color={is_active ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formattedDate}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {is_active ? <Tooltip content="Block User">
                          <IconButton variant="text" onClick={() => blockUser(id)}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </IconButton>
                        </Tooltip> :
                          <Tooltip content="Unblock User">
                            <IconButton variant="text" onClick={() => handleUnblockUser(id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                            </IconButton>
                          </Tooltip>}

                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {Math.ceil(userList.length / ITEMS_PER_PAGE)}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={endIndex >= userList.length}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Studentslist;