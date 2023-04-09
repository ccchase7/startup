const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('startup').collection('user');
const savedCollection = client.db('startup').collection('saved');

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function addSavedAnagram(anagram) {
  //Get the list of saved anagrams from the database
  let curr_saved = await getSavedAnagrams(anagram.curr_user);

  if (curr_saved.length === 0)
  {
    curr_saved = [anagram];
  }
  
  //Make sure that there are less than the limit in there
  //and add the next one
  if (curr_saved.length > anagram.limit)
  {
      curr_saved.shift();
      curr_saved.push(anagram);    
  }
  
  //Replace the old list of saved anagrams with the new one
  try {
    const query = { user: anagram.curr_user };
    await savedCollection.replaceOne(query, curr_saved, {});
  }
  catch (e) {
    console.log(e);
  }
}

async function getSavedAnagrams(user)
{
  //Get the list of saved anagrams from the database
  const query = { user: user };
  const options = { date: -1 };
  let cursor = null;
  let curr_saved = null;

  try
  {
    console.log("HERE");
    cursor = await savedCollection.find(query, options)
    console.log("But not here");
  }
  catch (e)
  {
      console.log(e)
      return [];
  }

  //check to see if any have been saved yet.
  //If not, create an empty array
  // if (!cursor.hasNext())
  // {
  //   curr_saved = [];
  // }
  // else
  // {
  //   try
  //   {
  //       curr_saved = await cursor.toArray();
  //   }
  //   catch (e)
  //   {
  //     console.log(e)
  //   }
    
  // }

  curr_saved = await cursor.toArray();

  return curr_saved;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addSavedAnagram,
  getSavedAnagrams,
};