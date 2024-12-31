import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//TO GET ALL CONTACTS
const getContacts = () => {
  return axios.get('https://65b36193770d43aba479a2f2.mockapi.io/users');
};

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });
};

// TO GET A SPECIFIC CONTACT
const getContact = async (user) => {
  let data;
  await axios
    .get(`https://65b36193770d43aba479a2f2.mockapi.io/users/${user}`)
    .then((response) => {
      data = response.data;
    });
  return data;
};

export const useContact = (user) => {
  return useQuery({
    queryKey: ['contacts', user],
    queryFn: () => getContact(user),
  });
};

// TO DELETE A USER
const deleteUser = (user) => {
  return axios.delete(
    `https://65b36193770d43aba479a2f2.mockapi.io/users/${user}`
  );
};

export const deleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};

// TO ADD A NEW USER
const addUser = (user) => {
  return axios.post('https://65b36193770d43aba479a2f2.mockapi.io/users', user);
};

export const addContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};
