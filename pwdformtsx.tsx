import React from 'react';
import { Button, DatePicker, Form, Input, Layout, Radio, Select, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import styles from '../../styles/pwdform.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axios.js';
import { useSubmitForm } from '../forms/useSubmitForm';

/*
export const useSubmitForm = () => {
  return useMutation((formData: any) => axiosInstance.post('/submit', formData));
};
*/

const { Header, Content } = Layout;

const PWDForm = () => {
  const router = useRouter(); 
  const [form] = Form.useForm();

/*
    const { mutate: submitForm, isLoading, isError, error } = useSubmitForm();

    const handleSubmit = (values: any) => {
        submitForm(values, {
            onSuccess: (data) => {
                console.log('Form submitted successfully', data);
                // Handle successful submission (e.g., show a success message, navigate to another page)
            },
            onError: (error) => {
                console.error('Error submitting form', error);
                // Handle submission error (e.g., show an error message)
            },
        });
    };


*/

  const handleSubmit = (values: any) => {
    console.log('Received values of form:', values);
    // Here you would handle the form submission, potentially sending data to your API
  };

  const handlePrevious = () => {
    // Handler for 'Previous' button if you need to navigate back or do something else
  };

  const disabilityOptions = [
    { label: 'Psychological Disability', value: 'psychological' },
    { label: 'Chronic Illness', value: 'chronic' },
    { label: 'Learning Disability', value: 'learning' },
    { label: 'Mental Disability', value: 'mental' },
    { label: 'Visual Disability', value: 'visual' },
    { label: 'Orthopedic (Musculoskeletal) Disability', value: 'orthopedic' },
    { label: 'Hearing Disability', value: 'hearing' },
    { label: 'Speech Impairment', value: 'speech' },
    { label: 'Multiple Disabilities', value: 'multiple' },
  ];

  const regionOptions = ['Region1', 'Region2', 'Region3', 'Region4', 'Region5'];
  const provinceOptions = ['Province1', 'Province2', 'Province3', 'Province4', 'Province5'];
  const statusOptions = ['Civil Status1', 'Civil Status2', 'Civil Status3', 'Civil Status4', 'Civil Status5'];
  const educOptions = ['Education1', 'Education2', 'Education3', 'Education4', 'Education5'];
  const employOptions = ['Employment1', 'Employment2', 'Employment3', 'Employment4', 'Employment5'];
  const natureOptions = ['Nature1', 'Nature2', 'Nature3', 'Nature4', 'Nature5'];
  const employtypeOptions = ['EmploymentType1', 'EmploymentType2', 'EmploymentType3', 'EmploymentType4', 'EmploymentType5'];
  const skillOptions = ['Skill1', 'Skill2', 'Skill3', 'Skill4', 'Skill5'];

  
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src="/logo.png" alt="Logo" width={100} height={50} />
        </div>
      </Header>
      <div className={styles.headertitle}>
        <div className={styles.headerContent}>
        <Button type="link" onClick={() => router.push('/reports/PWD')} className={styles.backButton}>
        <span className={styles.backText}>◄ Back</span>
        </Button>
        <div className={styles.titleContainer}>
        <h1>REPUBLIC OF THE PHILIPPINES</h1>
        <h2>NATIONAL CAPITAL REGION</h2>
        <h3>Persons with Disabilities (PWD)</h3>
        </div>
    </div>
    </div>

      <Content className={styles.content}>
        <Form form={form} onFinish={handleSubmit} layout="vertical" className={styles.pwdForm}>
            <Form.Item name="upload" label="Upload Photo of Person">
                <Upload>
                <Button icon={<UploadOutlined />}>Choose</Button>
                </Upload>
            </Form.Item>
            <Form.Item className={styles.singleFormItem} name="registrationNo" label="Registration No.">
                <Input disabled />
            </Form.Item>
            <div>
            <Form.Item className={styles.inlineFormItem} name="firstName" label="First Name">
                <Input />
            </Form.Item>
            <Form.Item className={styles.inlineFormItem} name="middleName" label="Middle Name">
                <Input />
            </Form.Item>
            <Form.Item className={styles.inlineFormItem} name="lastName" label="Last Name">
                <Input />
            </Form.Item>
            </div>
            <Form.Item label="Select Type of Disability (Please Check only one)">  
            <Radio.Group>
              <div className={styles.radioGroupContainer}>
                <div className={styles.radioGroupColumn}>
                  {disabilityOptions.slice(0, 3).map(option => (
                    <Radio value={option.value} key={option.value}>{option.label}</Radio>
                  ))}
                </div>
                <div className={styles.radioGroupColumn}>
                  {disabilityOptions.slice(3, 6).map(option => (
                    <Radio value={option.value} key={option.value}>{option.label}</Radio>
                  ))}
                </div>
                <div className={styles.radioGroupColumn}>
                  {disabilityOptions.slice(6).map(option => (
                    <Radio value={option.value} key={option.value}>{option.label}</Radio>
                  ))}
                </div>
              </div>
            </Radio.Group>
            </Form.Item>

            <div>
            <Form.Item className={styles.inlineFormItem} name="address" label="Address (House No. and Street">
                <Input />
            </Form.Item>
            <Form.Item className={styles.inlineFormItem} name="barangay" label="Barangay">
                <Input />
            </Form.Item>
            <Form.Item className={styles.inlineFormItem} name="municipality" label="Municipality">
                <Input />
            </Form.Item>
            </div>    
          

            <div className={styles.dropdownContainer}>
            <Form.Item label="Region" className={styles.dropdown}>
              <Select placeholder="Select a region">
                {regionOptions.map(region => (
                  <Select.Option key={region} value={region}>{region}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item label="Province" className={styles.dropdown}>
              <Select placeholder="Select a province">
                {provinceOptions.map(province => (
                  <Select.Option key={province} value={province}>{province}</Select.Option>
                ))}
              </Select>
            </Form.Item>
           </div>

            <div>
            <Form.Item
              className={styles.inlineFormItem}
              name="telephone"
              label="Telephone No."
              rules={[
                {
                  required: true,
                  message: 'Please input your telephone number!',
                },
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: 'Please input a valid telephone number!',
                },
              ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
              className={styles.inlineFormItem}
              name="mobile"
              label="Mobile No."
              rules={[
                {
                  required: true,
                  message: 'Please input your mobile number!',
                },
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: 'Please input a valid mobile number!',
                },
              ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
              className={styles.inlineFormItem}
              name="email"
              label="Email Address"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not a valid email!',
                },
                {
                  required: true,
                  message: 'Please input your email address!',
                },
              ]}
            >
                <Input />
            </Form.Item>
            </div>   

            <div className={styles.formRow}>
            <div className={styles.dateFormItemWrapper}>
              <Form.Item
                name="dateOfBirth"
                label="Date of Birth"
                rules={[{ required: true, message: 'Please select your date of birth!' }]}
              >
                <DatePicker style={{ width: '100%' }}/>
              </Form.Item>
            </div>
            
            <div className={styles.sexFormItemWrapper}>
              <Form.Item
                name="sex"
                label="Sex"
                rules={[{ required: true, message: 'Please select your sex!' }]}
              >
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            
            <div className={styles.natFormItemWrapper}>
              <Form.Item
                name="nationality"
                label="Nationality"
                rules={[{ required: true, message: 'Please input your nationality!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            
            <div className={styles.bloodFormItemWrapper}>
              <Form.Item
                name="bloodType"
                label="Blood Type"
                rules={[{ required: true, message: 'Please input your blood type!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            </div>


            <div className={styles.dropdownContainerThree}>
            <Form.Item label="Civil Status" className={styles.dropdownThree}>
              <Select placeholder="Select">
                {statusOptions.map(status => (
                  <Select.Option key={status} value={status}>{status}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item label="Educational Attainment" className={styles.dropdownThree}>
              <Select placeholder="Select">
                {educOptions.map(educ => (
                  <Select.Option key={educ} value={educ}>{educ}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Employment Status" className={styles.dropdownThree}>
              <Select placeholder="Select">
                {employOptions.map(employ => (
                  <Select.Option key={employ} value={employ}>{employ}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            </div>

            <div className={styles.dropdownContainerThree}>
            <Form.Item label="Nature of Employer" className={styles.dropdownThree}>
              <Select placeholder="Select">
                {natureOptions.map(nature => (
                  <Select.Option key={nature} value={nature}>{nature}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item label="Type of Employment" className={styles.dropdownThree}>
              <Select placeholder="Select">
                {employtypeOptions.map(employtype => (
                  <Select.Option key={employtype} value={employtype}>{employtype}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Type of Skill" className={styles.dropdownThree}>
              <Select placeholder="Select">
                {skillOptions.map(skill => (
                  <Select.Option key={skill} value={skill}>{skill}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            </div>

           
            <div>
            <Form.Item
              className={styles.doubleFormItem}
              name="sssno"
              label="SSS No."
              rules={[
                {
                  required: true,
                  message: 'Please input your SSS number!',
                },
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: 'Please input a valid SSS number!',
                },
              ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
              className={styles.doubleFormItem}
              name="gsis"
              label="GSIS No."
              rules={[
                {
                  required: true,
                  message: 'Please input your GSIS number!',
                },
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: 'Please input a valid GSIS number!',
                },
              ]}
            >
                <Input />
            </Form.Item>
            </div>  

            <div className={styles.philformRow}>
              <Form.Item
                className={styles.singlephilFormItem}
                name="philhealth"
                label="Philhealth No."
                // rules...
              >
                <Input />
              </Form.Item>
              <div className={styles.philFormItemWrapper}>
                <Form.Item
                  name="philhealthOptions"
                >
                  <Radio.Group>
                    <Radio value="philmem">Philhealth Member</Radio>
                    <Radio value="philmemdep">Philhealth Member Dependent</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>

              <h4>Organizational Information</h4>
              <div>
              <Form.Item
                className={styles.doublewFormItem}
                name="orgaff"
                label="Organizational Affiliated"
              >
                  <Input />
              </Form.Item>
              <Form.Item
                className={styles.doublewFormItem}
                name="contactperson"
                label="Contact Person"
              >
                  <Input />
              </Form.Item>
              </div>  
              <div>
              <Form.Item
                className={styles.doublewFormItem}
                name="offadd"
                label="Office Address"
              >
                  <Input />
              </Form.Item>
              <Form.Item
                className={styles.doublewFormItem}
                name="offtelno"
                label="Tel No."
              >
                  <Input />
              </Form.Item>
              </div> 


              <h4>Family Composition</h4>
              <div className={styles.lformRow}>
                  <Form.Item
                    className={styles.pangFormItem}
                    name="pangalan"
                    label="Pangalan"
                  >
                      <Input />
                  </Form.Item>
                <Form.Item
                    className={styles.relaFormItem}
                    name="relasyon"
                    label="Relasyon"
                  >
                      <Input />
                  </Form.Item>
                <Form.Item
                    className={styles.edadFormItem}
                    name="edad"
                    label="Edad"
                  >
                      <Input />
                  </Form.Item>
                <Form.Item
                    className={styles.hanaFormItem}
                    name="hanapbuhay"
                    label="Hanapbuhay"
                  >
                      <Input />
                  </Form.Item>
                  <div>
                  <Button icon={<PlusOutlined />} className="circleButton" />
                </div>
                </div>


            <div className={styles.formFooter}>
                <Button onClick={handlePrevious}>Previous</Button>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </div>
          </Form>
      </Content>
    </Layout>
  );
};

export default PWDForm;

