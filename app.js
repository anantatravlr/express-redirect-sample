const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

app.use(cors()); 
app.use(bodyParser.json())

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});

function queryBuilderFromObj (x) {
  let params = new URLSearchParams(x);
  let keysForDel = [];
  params.forEach((value, key) => {
    if (value == '' || value == undefined || value == 'undefined') {
      keysForDel.push(key);
    }
  });
  
  keysForDel.forEach(key => {
    params.delete(key);
  });


  var result = params.toString()
  if (result){
    result = `?${result}`
  }

  return result
} 


app.get('/api/quotes', (req, res) => {
  
  var itemType = req.query.itemType
  var keyword = req.query.keyword
  var pageIndex = req.query.pageIndex
  var pageSize = req.query.pageSize
  var status = req.query.status
  
  const queryObj = {
    itemType: itemType,
    keyword: keyword,
    pageIndex: pageIndex,
    pageSize: pageSize,
    status: status
  };

  var query = queryBuilderFromObj(queryObj)

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://10travlr.odin.travlr.com/api/quotes${query}`,
    headers: { 
      'Cookie': 'travlr_sso_token=b39179621d60c5ff5702f4c832f19ecc'
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));

    res.json(response.data)
  })
  .catch((error) => {
    console.log(error);
  });  
})


app.get('/api/quotes/:id', (req, res) => {
  var id = req.params.id

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://10travlr.odin.travlr.com/api/quotes/${id}`,
    headers: { 
      'Cookie': 'travlr_sso_token=b39179621d60c5ff5702f4c832f19ecc'
    }
  };
  
  axios.request(config)
  .then((response) => {
    
    console.log("Response result after fetching API Quote: ")
    console.log(JSON.stringify(response.data));

    res.json(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
})

app.post('/api/quotes/update-customer/:id',(req, res) => {
  var id = req.params.id

  var body = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    phoneCode: req.body.phoneCode 
  }

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://10travlr.odin.travlr.com/api/quotes/update-customer/${id}`,
    headers: { 
      'Content-Type': 'application/json', 
      'Cookie': 'travlr_sso_token=b39179621d60c5ff5702f4c832f19ecc'
    },
    data : body
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));

    res.json(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
})

app.post('/api/quotes/update-commission/:id',(req, res) => {
  var id = req.params.id

  var body = {
    amount: req.body.amount
  }

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://10travlr.odin.travlr.com/api/quotes/update-commission/${id}`,
    headers: { 
      'Content-Type': 'application/json', 
      'Cookie': 'travlr_sso_token=b39179621d60c5ff5702f4c832f19ecc'
    },
    data : body
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));

    res.json(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
})

app.post('/api/quotes/send-email',(req, res) => {
  var body = {
    quoteId: req.body.quoteId,
    introMessage: req.body.introMessage,
    quoteRemarks: req.body.quoteRemarks,
    agentName: req.body.agentName,
    agentContactInfo: req.body.agentContactInfo,
    isResendEmail: req.body.isResendEmail
  }

  console.log(body)

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: "https://10travlr.odin.travlr.com/api/quotes/send-email",
    headers: { 
      'Content-Type': 'application/json', 
      'Cookie': 'travlr_sso_token=b39179621d60c5ff5702f4c832f19ecc'
    },
    data : body
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));

    res.json(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
})

app.delete('/api/quotes/:id', (req, res) => {
  var id = req.params.id

  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `https://10travlr.odin.travlr.com/api/quotes/1${id}`,
    headers: { 
      'Cookie': 'travlr_sso_token=b39179621d60c5ff5702f4c832f19ecc'
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));

    res.json(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
})
