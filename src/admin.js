import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';

function AdminView({ handleResumeUpload, handleImageUpload,formData,setFormData, fetchPortfolioDetails, handleRemoveImage ,portfolioDetails}) {
  console.log('hey admin image'+portfolioDetails.image)
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const onSwitchToUser = () => {
    navigate('/'); // Navigate to the home page
  };
  

  

  

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (id, type) => {
    const itemToEdit = portfolioDetails[type].find(item => item._id === id);
    setFormData({
      title: itemToEdit.title,
      description: itemToEdit.description,
      type: type,
    });
    setIsEditing(true);
    setEditId(id);
  };

  const handleRemove = async (id, type) => {
    try {
      await fetch(`https://ramkiranmeduri.netlify.app/api/portfolio/remove/${id}`, { method: 'DELETE' });
      fetchPortfolioDetails(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error removing portfolio item:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Use the state to construct FormData for submission
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('type', formData.type);

    
    // Append files if present
    if (formData.image) formDataToSend.append('image', formData.image);
    console.log(formData.image)
    if (formData.resume) formDataToSend.append('resume', formData.resume);

    const isUpdateOperation = isEditing && editId;
    let url = isUpdateOperation ? `https://ramkiranmeduri.netlify.app/api/portfolio/update/${editId}` : 'https://ramkiranmeduri.netlify.app/api/portfolio/add';
    const method = isUpdateOperation ? 'PUT' : 'POST';

    try {
      console.log("seeeeeeee"+formDataToSend)
        const response = await fetch(url, {
            method: method,
            // No headers object needed for FormData; it sets its own Content-Type
            body: formDataToSend,
        });

        if (response.ok) {
            fetchPortfolioDetails();  // Refresh to show changes
            resetForm();  // Clear form data
        } else {
            console.error('Failed to submit portfolio details');
        }
    } catch (error) {
        console.error('Error submitting portfolio details:', error);
    }
};

// Function to reset form state
const resetForm = () => {
    setFormData({
        title: '',
        description: '',
        type: 'projects',
        image: null,
        resume: null,
    });
    setIsEditing(false);
    setEditId(null);
};


  

  return (
    <div>
      <h2>Admin Dashboard</h2>
  
      {/* Profile Picture */}
      <FormGroup>
        <Label for="imageUpload">Profile Picture</Label>
        <Input type="file" name="image"  onChange={handleImageUpload} />
        {console.log("check"+portfolioDetails.image)}
        {portfolioDetails.image && (
          <div>
            <img src={portfolioDetails.image } alt="Profile" style={{ width: '200px', marginTop: '10px' }} />
            <Button color="danger" onClick={() => handleRemoveImage()}style={{ display: 'block', margin: '10px auto' }}>Remove Profile Photo</Button>
          </div>
        )}
      </FormGroup>
  
      {/* Resume Upload */}
      <FormGroup>
        <Label for="resumeUpload">Resume Upload</Label>
        <Input type="file" name="resume"  onChange={handleResumeUpload} />
       <p style={{color:'white'}}>  {portfolioDetails.resume}</p>

      </FormGroup>
  
      {/* Form to Add/Edit Details */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="type">Select Type</Label>
          <Input type="select" name="type" id="type" value={formData.type} onChange={handleChange} disabled={isEditing}>
            <option value="projects">Projects</option>
            <option value="workExperiences">Work Experience</option>
            <option value="about">About</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" placeholder="Enter title" value={formData.title} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" id="description" placeholder="Enter description" value={formData.description} onChange={handleChange} />
        </FormGroup>
        <Button type="submit" color="primary">{isEditing ? 'Update Detail' : 'Add Detail'}</Button>
        {isEditing && <Button onClick={() => {setIsEditing(false); setFormData({ title: '', description: '', type: 'projects' }); setEditId(null);}} color="secondary" className="ml-2" type="button">Cancel Edit</Button>}
        <Button onClick={onSwitchToUser} color="secondary" className="ml-3" type="button">Switch to User View</Button>
      </Form>
  
      {/* Lists of Current Details with Edit Option */}
      {['projects', 'workExperiences', 'about'].map((type, idx) => (
        <div key={idx}>
          <h3 className="mt-4">Current {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
          <ListGroup>
            {portfolioDetails[type]?.map(item => (

              <ListGroupItem key={item._id || item.title}>
                {item.title}
                <Button style={{ backgroundColor: 'transparent', border: 'none', color: 'blue', float: 'right', marginLeft: '10px' }} onClick={() => handleEdit(item._id, type)}>✎</Button>
                <Button style={{ backgroundColor: 'transparent', border: 'none', color: 'red', float: 'right' }} onClick={() => handleRemove(item._id, type)}>&times;</Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      ))}
    </div>
  );
  
}

export default AdminView;




