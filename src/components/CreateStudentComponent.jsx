import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { InputMask } from 'primereact/inputmask';
import StudentService from '../services/StudentService';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { CascadeSelect } from 'primereact/cascadeselect';
import cities from '../cities.json';

class CreateStudentComponent extends Component {
    constructor(props){
        super(props);

        this.state={
            id: this.props.match.params.id,
            totalSize: 0,
            firstName:'',
            lastName:'',
            mobilePhoneNumber:'',
            city:'',
            district:'',
            description:'',
            cities: require('../cities.json'),
        }
        
        this.onBasicUploadAuto = this.onBasicUploadAuto.bind(this);
        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
        this.changemobilePhoneNumberHandler=this.changemobilePhoneNumberHandler.bind(this);
        this.changeCityHandler=this.changeCityHandler.bind(this);
        this.changeDistrictHandler=this.changeDistrictHandler.bind(this);
        this.changeDescriptionHandler=this.changeDescriptionHandler.bind(this);
        this.saveOrUpdateStudent=this.saveOrUpdateStudent.bind(this);
    }
    componentDidMount(){
        if(this.state.id === -1){
            return
        }else{
        StudentService.getStudentById(this.state.id).then((res) => {
            let student=res.data;
            this.setState({
                firstName:student.firstName,
                lastName:student.lastName,
                mobilePhoneNumber:student.mobilePhoneNumber,
                city:student.city,
                district:student.district,
                description:student.description,

            });});
         } 


    }
  
    selectCountry (val) {
        this.setState({ country: val });
      }
      selectRegion (val) {
        this.setState({ region: val });
      }
    onBasicUploadAuto() {
        this.toast.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }
    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }
    changemobilePhoneNumberHandler = (event) => {
        this.setState({mobilePhoneNumber: event.target.value});
    }
    changeCityHandler = (event) => {
        this.setState({city: event.target.value});
    }
    changeDistrictHandler = (event) => {
        this.setState({district: event.target.value});
    }
    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }
    cancel(){
        this.props.history.push('/students');

    }
    saveOrUpdateStudent = (e) =>{
            e.preventDefault();

            let student= {
                firstName:this.state.firstName,
                 lastName:this.state.lastName, 
                 mobilePhoneNumber:this.state.mobilePhoneNumber,
                city:this.state.city,
                district:this.state.district,
                description:this.state.description 
            }
            console.log('student =>' +JSON.stringify(student));

             this.state.id === '_add' ? 
             StudentService.createStudent(student).then(res =>{
                this.props.history.push('/students'); }) : 
             StudentService.updateStudent(student, this.state.id).then( res =>{
                this.props.history.push('/students'); })

            }
    
    getTitle(){
        return this.state.id === '_add' ?"Add Student" : "Update Student";
    }

    render() {

        const footer = (
            <span>
                <Button label="Save" icon="pi pi-check"  onClick={this.saveOrUpdateStudent}/>
                <Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-ml-2" onClick={this.cancel.bind(this)} />
            </span>
        );

        return (
            <Card title={this.getTitle()} subTitle="Please Enter Information" style={{ width: '25em', margin:'0 auto' , backgroundColor:'#e6e6e6'}} footer={footer} >
                <p className="p-m-0" style={{lineHeight: '1.5'}}>

                </p>
                <div>
                <div className="p-field p-grid">
                <label htmlFor="firstName" className="p-col-fixed" style={{width:'100px'}}>Firstname</label>
                <div className="p-col">
                    <InputText id="firstName" type="text" onChange={this.changeFirstNameHandler} value={this.state.firstName}/>
                </div>
            </div>
            <div className="p-field p-grid">
                <label htmlFor="lastName" className="p-col-fixed" style={{width:'100px'}}>Lastname</label>
                <div className="p-col">
                    <InputText id="lastName" type="text" onChange={this.changeLastNameHandler} value={this.state.lastName}/>
                </div>
            </div>
            <div className="p-field p-grid">
                <label htmlFor="mobilePhoneNumber" className="p-col-fixed" style={{width:'100px'}}>Mobile Phone Number</label>
                <div className="p-col">
                     <InputMask  id="mobilePhoneNumber" mask="999-9999999"  onChange={this.changemobilePhoneNumberHandler} value={this.state.mobilePhoneNumber}></InputMask>
                </div>
            </div>

            <div className="p-field p-grid">
                <label htmlFor="city" className="p-col-fixed" style={{width:'100px'}}>City</label>
                <div className="p-col">
                    <InputText id="city" type="text" onChange={this.changeCityHandler} value={this.state.city}/>
                </div>
            </div>
            <div className="p-field p-grid">
                <label htmlFor="district" className="p-col-fixed" style={{width:'100px'}}>District</label>
                <div className="p-col">
                    <InputText id="district" type="text" onChange={this.changeDistrictHandler} value={this.state.district}/>
                </div>
            </div>



            {/* <CascadeSelect  options={this.state.cities}  optionGroupLabel={"name"} optionGroupChildren={['counties']}
                                    style={{minWidth: '14rem'}} placeholder={"Select a City"} onChange={event => this.setState({district: event.value})}/> */}

            <div className="p-field p-grid">
                <label htmlFor="description" className="p-col-fixed" style={{width:'100px'}}>Description</label>
                <div className="p-col">
                    <InputText id="description" type="text" onChange={this.changeDescriptionHandler} value={this.state.description}/>
                </div>
        </div>

     </div>
     <h5>Add File</h5>
                <FileUpload mode="basic" name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" accept="image/*application/pdf" maxFileSize={1000000} onUpload={this.onBasicUploadAuto} auto chooseLabel="Browse" />
</Card>
        );
    }
}

export default CreateStudentComponent;