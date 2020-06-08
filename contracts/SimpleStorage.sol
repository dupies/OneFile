pragma solidity ^0.5.0;

contract SimpleStorage {
    string ipfsfile = "kick";
    enum Genders {male, female}
    
    struct  Child{
        string  Childnames;
        string  Surname;
        Genders Gender;
        string  Highschool;
        uint32  MatricYear;
        uint32  APS;
        string  BirthFile;
    }
    
 
    Child       child;
   
   
    function setipfsfile(string memory x) public {
        ipfsfile = x;
    }

    function getipfsfile() public view returns (string memory) {
        return ipfsfile;
    }
    
    function createChild(
            string memory childnames, 
            string memory surname, 
            Genders gender, 
            string memory highschool, 
            uint32 matricYear, 
            uint32 aps, 
            string memory birthfile
            ) public {
        child = Child(
                    childnames,
                    surname, 
                    gender, 
                    highschool, 
                    matricYear, 
                    aps, 
                    birthfile
                );
    }
   
    function getChild() public view returns (
            string memory, 
            string memory, 
            Genders, 
            string memory, 
            uint32, 
            uint32, 
            string memory
        ) {
        return (
            child.Childnames,
            child.Surname,
            child.Gender,
            child.Highschool,
            child.MatricYear,
            child.APS,
            child.BirthFile
        );
   }
   
}