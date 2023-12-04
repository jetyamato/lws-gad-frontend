import React, { useState } from 'react';
import { Modal, Form, Input, Table, DatePicker, Button, Dropdown, Menu,Select, Upload, Radio } from 'antd';
import { DownOutlined, CalendarOutlined, PlusOutlined, FilterOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import DashboardLayout from '../../components/Layout';
import styles from '../../styles/pwd.module.css';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ColumnProps } from 'antd/es/table';
import router from 'next/router';


const PWDPage: React.FC = () => {


  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  // Define the onDateChange handler with types
  const onDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };
  
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(10);

/*
    // Query to fetch reports data
    const { data, isLoading, error } = useQuery(['reports', searchText, pageSize], () =>
    axios('/api/reports', {
      params: { searchText, pageSize },
    }).then((res) => res.data)
  );
*/

  // Handlers for search, page size change, date change, etc.
  const handleSearch = () => {
    // Implement the search functionality using `setSearchText`
  };

  const handlePageSizeChange = (value: React.SetStateAction<number>) => {
    setPageSize(value);
  };

  const handleDateChange = (date: React.SetStateAction<Dayjs | null>, dateString: any) => {
    setSelectedDate(date);
  };

  // Define the onSearch handler with types
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Your logic here...
    console.log(e.target.value);
  };

    // Mock data for the PWD table
    const mockData: PWDReport[] = [
      {
        key: '1',
        name: 'Jane Doe',
        registrationNumber: 'REG123',
        typeOfDisability: 'Visual Impairment',
        dateOfBirth: '1990-01-01',
        civilStatus: 'Single',
      },
      // ... more mock data ...
    ];

  const [data, setData] = useState(mockData);
  const isLoading = false; // Set to false as we're using mock data
  const error = null; // Set to null as we're using mock data


  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Function to handle the calendar icon click
  const handleCalendarClick = () => {
    (document.querySelector('.ant-picker-input input') as HTMLElement)?.focus();
  // Toggle the visibility of the DatePicker
  setIsDatePickerOpen(!isDatePickerOpen);
  };

  const exportMenu = (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
    </Menu>
  );



    //modal -------
      // State for managing modal visibility
      const [isModalVisible, setIsModalVisible] = React.useState(false);

      // Handler for opening the modal
      const showModal = () => {
        setIsModalVisible(true);
      };
    
      // Handler for closing the modal
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      // Define your interface for the PWD report
      interface PWDReport {
        key: string;
        name: string;
        registrationNumber: string;
        typeOfDisability: string;
        dateOfBirth: string;
        civilStatus: string;
      }

      //table ------
      const columns: ColumnProps<PWDReport>[] = [
        {
          title: 'NAME',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: 'REGISTRATION NUMBER',
          dataIndex: 'registrationNumber',
          key: 'registrationNumber',
          // Add sorter if needed
        },
        {
          title: 'TYPE OF DISABILITY',
          dataIndex: 'typeOfDisability',
          key: 'typeOfDisability',
          // Add sorter if needed
        },
        {
          title: 'DATE OF BIRTH',
          dataIndex: 'dateOfBirth',
          key: 'dateOfBirth',
          // Add sorter if needed
        },
        {
          title: 'CIVIL STATUS',
          dataIndex: 'civilStatus',
          key: 'civilStatus',
          // Add sorter if needed
        },
        {
          title: 'ACTION',
          key: 'action',
          // Define how you want to render the actions column
        },
      ];
          

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>PWD Reports</h1>
        <div className={styles.dateAndActions}>
        <div className={styles.dateDisplay}>
          Showing for: {selectedDate?.format('MMMM D, YYYY') || 'Select a date'}
          <div onClick={handleCalendarClick} className={styles.calendarIcon}>
            <CalendarOutlined />
          </div>
          {isDatePickerOpen && (
            <DatePicker
              open={true}
              onChange={(date, dateString) => {
                onDateChange(date);
                setIsDatePickerOpen(false); // Close the DatePicker after a date is selected
              }}
              className={styles.hiddenDatePicker}
            />
          )}
        </div>
        <div className={styles.actions}>
          <Button type="primary" className={styles.addReportButton} onClick={() => router.push('/forms/pwdform')}>
            PWD Form
          </Button>
          <Button type="primary" className={styles.addReportButton} onClick={showModal}>
            + Add Report
          </Button>
            <Dropdown overlay={exportMenu} trigger={['click']}>
              <Button className={styles.exportButton}>
                Export as <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          </div>
          
          <div className={styles.tableTopBar}>
            <div className={styles.searchBar}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search..."
                // onChange handler for search input
              />
            </div>
            <div className={styles.entriesAndFilter}>
              <div className={styles.showEntries}>
                <span>Show Entries</span>
                <Select
                  defaultValue={10}
                  onChange={(value) => {
                    // setPageSize(value);
                  }}
                >
                  <Select.Option value={10}>10</Select.Option>
                  <Select.Option value={20}>20</Select.Option>
                  <Select.Option value={50}>50</Select.Option>
                </Select>
              </div>
              <Button icon={<FilterOutlined />} className={styles.advanceFilterButton}>
                Advance Filter
              </Button>
            </div>

          </div>
              {/* Table component */}
            <Table<PWDReport>
              columns={columns}
              dataSource={mockData} 
              pagination={{
                total: data.length,
                pageSizeOptions: ['10', '20', '50'],
                showSizeChanger: true,
              }}
              onChange={(pagination, filters, sorter, extra) => {
                // Handle table changes
              }}
              className={styles.antTableWrapper} // Make sure this class matches the one in your CSS
            />
      </div>

      {/* Modal with a form inside */}
      <Modal
        title="Add New Report"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          // Custom footer buttons, or you can remove this prop to use the default OK/Cancel buttons
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleCancel}>
            Submit
          </Button>,
        ]}
      >
        {/* You can add Form.Item components inside here */}
        <Form layout="vertical" className={styles.pwdForm}>
          <h1 className={styles.title}>REPUBLIC OF THE PHILIPPINES</h1>
          <h2 className={styles.subTitle}>NATIONAL CAPITAL REGION</h2>
          <h3 className={styles.subTitle}>Persons with Disabilities (PWD)</h3>

          <Form.Item name="photo" label="Upload Photo of the Person" valuePropName="fileList">
            <Upload action="/upload" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="registrationNo" label="Registration No.">
            <Input disabled />
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item name="firstName" label="First Name" style={{ flexBasis: '30%' }}>
              <Input />
            </Form.Item>
            <Form.Item name="middleName" label="Middle Name" style={{ flexBasis: '30%' }}>
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name" style={{ flexBasis: '30%' }}>
              <Input />
            </Form.Item>
          </Form.Item>

          <Form.Item name="disabilityType" label="Select Type of Disability (Please Check only one)">
            <Radio.Group>
              <Radio value="psychological">Psychological Disability</Radio>
              <Radio value="mental">Mental Disability</Radio>
              {/* ... other radio buttons ... */}
            </Radio.Group>
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item name="address" label="Address (House No. and Street)" style={{ flexBasis: '40%' }}>
              <Input />
            </Form.Item>
            {/* ... other address fields ... */}
          </Form.Item>

          {/* ... other form fields ... */}

          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>

    </DashboardLayout>
  );

};

export default PWDPage;

