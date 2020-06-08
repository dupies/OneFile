import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import ipfs from './ipfs';
import storeMyValue from './storeMyValue';
import Select from 'react-select';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      Gender:0,
      Highschool:'',
      MatricYear:0,
      APS:0,
      selectedOption: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target.name;

    switch(target) {
      case 'firstname':
        this.setState({FirstName: event.target.value});
        break;
      case 'lastname':
        this.setState({LastName: event.target.value});
        break;
      case 'gender':
        this.setState({Gender: event.target.value});
        break;
      case 'highschool':
        this.setState({Highschool: event.target.value});
        break;
      case 'matricyear':
        this.setState({MatricYear: event.target.value});
        break;
      case 'aps':
        this.setState({APS: event.target.value});
        break;  
      default:
        alert('an error occured!');
    }
  }

  

  handleSubmit(event) {
    alert("Success!");
    event.preventDefault();
  }

  state = {
    ipfsHash:null,
    buffer:'',
    transactionHash:'',
    gasUsed:'',
    txReceipt: '' ,
  };


  captureFile =(event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };

  convertToBuffer = async(reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    this.setState({buffer});
  };


onSubmit = async (event) => 
{ 
  window.web3.currentProvider.enable();

  event.preventDefault();
  // console.log("web3 value is ",web3.eth.getAccounts());
  const accounts = await web3.eth.getAccounts();
  // console.log('Sending from Metamask account: ' , accounts[0]);
  const ethAddress = await storeMyValue.options.address;

  this.setState({ethAddress});
  await ipfs.add(this.state.buffer, (err, ipfsHash) => 
      {
        console.log(err,ipfsHash);
        this.setState({ ipfsHash:ipfsHash[0].hash });

        storeMyValue.methods.setipfsfile(this.state.ipfsHash).send
          (
            {
              from: accounts[0]
            }, 
            (error, transactionHash) => 
              {
                console.log("transaction hash is ",transactionHash);
                this.setState({transactionHash});
              }
          );
      }
    )  
  
};

createChild = async (event) => 
{
  const accounts = await web3.eth.getAccounts();

  await storeMyValue.methods.createChild
    (
      this.state.FirstName,
      this.state.LastName, 
      this.state.Gender, 
      this.state.Highschool, 
      this.state.MatricYear, 
      this.state.APS, 
      String(this.state.ipfsHash)
    ).send
      (
        {
          gas: 900000,
          from: accounts[0]
        }, 
        (error, transactionHash) => 
          {
            console.log("transaction hash is ",transactionHash);
            this.setState({transactionHash});
          }
      );

  await this.getFileHash();
  await this.getchild(); 
};

getFileHash = async (event) => 
{
  var data = await storeMyValue.methods.getipfsfile().call();

  // ipfs.get("QmZkGYy16EyWkEvYCfwqSFVdgdCAugL5JA9X8sEfTLG9Hs");
  console.log("FileHash :" + String(data));
};

getchild = async (event) => 
{
  var _child = await storeMyValue.methods.getChild().call();
  console.log(_child);
  console.log("Child created!");
};


render() {return (
<div className="App">
   <header className="App-header">
      <h1> OneFile</h1>
   </header>
   <hr />
      <h3> Fill in studen information! </h3>
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <br />
          <input
            name="firstname"
            type="text"
            value={this.state.FirstName}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Last Name:
          <br />
          <input
            name="lastname"
            type="text"
            value={this.state.LastName}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Gender:
          <br />
          <div className="col-md-4">
          <select 
            value={this.state.Gender} 
            name = "gender" 
            onChange={this.handleInputChange}>
              <option value='0'>Male</option>
              <option value='1'>Female</option>
          </select>
          </div>
        </label>
        <br />
        <label>
          Highschool:
          <br />
          <input
            name="highschool"
            type="text"
            value={this.state.Highschool}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Matric Year:
          <br />
          <input
            name="matricyear"
            type="number"
            value={this.state.MatricYear}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          APS Score:
          <br />
          <input
            name="aps"
            type="number"
            value={this.state.APS}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <h3> Choose Transcript to send to IPFS </h3>
      <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile}/>
          <button type="submit"> Send it </button>
          <div>
            <button onClick={this.createChild}> Run </button>
          </div>  
      </form>
   <hr/>
   <table >
      <thead>
         <tr>
            <th>Sl No</th>
            <th>Values</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td>IPFS Hash # stored on Eth Contract</td>
            <td>{this.state.ipfsHash}</td>
         </tr>
         <tr>
            <td>Ethereum Contract Address</td>
            <td>{this.state.ethAddress}</td>
         </tr>
         <tr>
            <td>Tx Hash # </td>
            <td>{this.state.transactionHash}</td>
         </tr>
      </tbody>
   </table>
</div>);
}
}export default App;


