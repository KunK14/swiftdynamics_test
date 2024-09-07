import "./test2.css";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Radio,
  RadioChangeEvent,
  Space,
  TableProps,
  Table,
  Checkbox,
  Typography,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addFormData,
  deleteFormData,
  clearFormData,
  editFormData,
  FormData,
  selectDeleteFormData,
} from "./slice/data.slice";
import { useTranslation } from "react-i18next";

interface Data1 {
  key: number;
  name: string;
  title: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  citizenID: string;
  gender: string;
  mobileCountry: string;
  mobilePhone: string;
  passportNo: string;
  expectedSalary: string;
}

interface RootState {
  form: Data1[];
}

const phoneOptions = [
  {
    label: "🇹🇭+66",
    value: "+66",
  },
  {
    label: "🇺🇸+1",
    value: "+1",
  },
  {
    label: "🇫🇷+33",
    value: "+33",
  },
];

function Test2() {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");
  const changeLangclick = (value: string) => {
    i18n.changeLanguage(value);
  };

  type TablePagination<T extends object> = NonNullable<
    Exclude<TableProps<T>["pagination"], boolean>
  >;
  type TablePaginationPosition = NonNullable<
    TablePagination<any>["position"]
  >[number];
  const [top] = useState<TablePaginationPosition>("topRight");
  const formData = useSelector((state: RootState) => state.form);
  const [form] = Form.useForm();
  const data: Data1[] = formData.map((item, index) => ({
    ...item,
    key: index,
    name: item.firstName + " " + item.lastName,
    mobile: item.mobileCountry + item.mobilePhone,
    genderLang: t(`test2.${item.gender}`),
    nationalityLang: t(`test2.select.${item.nationality}`),
  }));
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [genderValue, setGenderValue] = useState("");

  const onChangeGender = (e: RadioChangeEvent) => {
    setGenderValue(e.target.value);
  };

  const [mobileValue, setMobileValue] = useState("");
  const handleChangeMobile = (value: string) => {
    setMobileValue(value);
  };

  const submitData = () => {
    form.validateFields().then((values) => {
      const {
        citizenID1,
        citizenID2,
        citizenID3,
        citizenID4,
        citizenID5,
        mobilePhone,
      } = values;
      const citizenID = `${citizenID1}${citizenID2}${citizenID3}${citizenID4}${citizenID5}`;
      const newData: FormData = {
        title: values.title,
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: values.birthDate
          ? values.birthDate.format("YYYY-MM-DD")
          : "",
        nationality: values.nationality,
        citizenID: citizenID,
        gender: genderValue,
        mobileCountry: mobileValue,
        mobilePhone: mobilePhone,
        passportNo: values.passportNo,
        expectedSalary: values.expectedSalary,
      };
      if (editingIndex !== null) {
        dispatch(editFormData({ index: editingIndex, newData: newData }));
      } else {
        dispatch(addFormData(newData));
      }
      alert("Save Success");
      setEditingIndex(null);
    });
  };

  const editData = (index: number) => {
    const item = formData[index];
    if (item) {
      const citizenID1 = item.citizenID.slice(0, 1);
      const citizenID2 = item.citizenID.slice(1, 5);
      const citizenID3 = item.citizenID.slice(5, 10);
      const citizenID4 = item.citizenID.slice(10, 12);
      const citizenID5 = item.citizenID.slice(12, 13);
      setMobileValue(item.mobileCountry);
      form.setFieldsValue({
        title: item.title,
        firstName: item.firstName,
        lastName: item.lastName,
        birthDate: item.birthDate ? moment(item.birthDate) : null,
        nationality: item.nationality,
        citizenID1: citizenID1,
        citizenID2: citizenID2,
        citizenID3: citizenID3,
        citizenID4: citizenID4,
        citizenID5: citizenID5,
        gender: item.gender,
        mobilePhoneCode: item.mobileCountry,
        mobileInput: item.mobilePhone,
        passportNo: item.passportNo,
        expectedSalary: item.expectedSalary,
      });
      setGenderValue(item.gender);
      setEditingIndex(index);
    }
  };

  const deleteData = (v: number) => {
    alert("Delete Success");
    dispatch(deleteFormData(v));
  };

  const [selectedAll, setSelectedRowKeys] = useState<React.Key[]>([]);
  const isSelectAll =
    selectedAll.length === formData.length && formData.length > 0;

  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      const allRowKeys = formData.map((_, index) => index);
      setSelectedRowKeys(allRowKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const [selectInTabel, setSelectInTabel] = useState<React.Key[]>([]);
  const [selectAllinTabel, setSelectAllinTabel] = useState<React.Key[]>([]);

  const rowSelection = {
    onChange: (
      selectedRowKeysByTabel: React.Key[],
      selectedRows: FormData[]
    ) => {
      if (
        selectedRowKeysByTabel.length === formData.length &&
        formData.length > 0
      ) {
        setSelectAllinTabel(selectedRowKeysByTabel as number[]);
      }
      setSelectInTabel(selectedRowKeysByTabel);
    },
  };

  const deleteSelectedRows = () => {
    if (
      selectAllinTabel.length === formData.length ||
      selectedAll.length === formData.length
    ) {
      dispatch(clearFormData());
    }
    dispatch(selectDeleteFormData(selectInTabel as number[]));
    setSelectedRowKeys([]);
    setSelectInTabel([]);
    setSelectAllinTabel([]);
  };

  const columns: TableProps<Data1>["columns"] = [
    {
      title: `${t("test2.name")}`,
      dataIndex: "name",
      key: "key",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: `${t("test2.gender")}`,
      dataIndex: "genderLang",
      key: "key",
      sorter: (a, b) => a.gender.length - b.gender.length,
    },
    {
      title: `${t("test2.mobilePhone")}`,
      dataIndex: "mobile",
      key: "key",
      sorter: (a, b) => a.mobilePhone.length - b.mobilePhone.length,
    },
    {
      title: `${t("test2.nationality")}`,
      dataIndex: "nationalityLang",
      key: "key",
      sorter: (a, b) => a.nationality.length - b.nationality.length,
    },
    {
      title: `${t("test2.manage")}`,
      key: "key",
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" onClick={() => editData(record.key)}>
            {t("test2.button.edit")}
          </Button>
          <Button type="text" onClick={() => deleteData(record.key)}>
            {t("test2.button.delete")}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="boxHeader">
        <h1>{t("test2.formAndTable")}</h1>
        <div>
          <Select
            style={{ width: 120 }}
            defaultValue="en"
            onChange={changeLangclick}
            options={[
              { value: "en", label: "en" },
              { value: "th", label: "ไทย" },
            ]}
          />
          <Button href="/">Home</Button>
        </div>
      </div>
      <div className="formBox">
        <Form
          form={form}
          name="dataForm"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <div className="box1">
            <Form.Item
              label={t("test2.title")}
              name="title"
              className="grid-item"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Select placeholder="Title">
                <Select.Option value="mr">{t("test2.select.mr")}</Select.Option>
                <Select.Option value="mrs">
                  {t("test2.select.mrs")}
                </Select.Option>
                <Select.Option value="ms">{t("test2.select.ms")}</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label={t("test2.firstName")}
              name="firstName"
              className="grid-item"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("test2.lastName")}
              name="lastName"
              className="grid-item"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="boxBD">
            <Form.Item
              label={t("test2.birthDate")}
              name="birthDate"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label={t("test2.nationality")}
              name="nationality"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Select
                style={{
                  width: "20rem",
                }}
              >
                <Select.Option value="thai">
                  {t("test2.select.thai")}
                </Select.Option>
                <Select.Option value="french">
                  {t("test2.select.french")}
                </Select.Option>
                <Select.Option value="america">
                  {t("test2.select.america")}
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="citizenBox">
            <Form.Item label={t("test2.citizenID")}>
              <Space wrap>
                <Form.Item
                  name="citizenID1"
                  style={{
                    display: "inline-block",
                    width: "5rem",
                    margin: "0px 5px 0px 5px",
                  }}
                >
                  <Input />
                </Form.Item>
                <Typography
                  style={{
                    margin: "0px 5px",
                  }}
                >
                  -
                </Typography>
                <Form.Item
                  name="citizenID2"
                  style={{
                    display: "inline-block",
                    width: "7rem",
                    margin: "0px 5px 0px 5px",
                  }}
                >
                  <Input />
                </Form.Item>
                <Typography
                  style={{
                    margin: "0px 5px",
                  }}
                >
                  -
                </Typography>
                <Form.Item
                  name="citizenID3"
                  style={{
                    display: "inline-block",
                    width: "7rem",
                    margin: "0px 5px 0px 5px",
                  }}
                >
                  <Input />
                </Form.Item>
                <Typography
                  style={{
                    margin: "0px 5px",
                  }}
                >
                  -
                </Typography>
                <Form.Item
                  name="citizenID4"
                  style={{
                    display: "inline-block",
                    width: "5rem",
                    margin: "0px 5px 0px 5px",
                  }}
                >
                  <Input />
                </Form.Item>
                <Typography
                  style={{
                    margin: "0px 5px",
                  }}
                >
                  -
                </Typography>
                <Form.Item
                  name="citizenID5"
                  style={{
                    display: "inline-block",
                    width: "3rem",
                    margin: "0px 5px 0px 5px",
                  }}
                >
                  <Input />
                </Form.Item>
              </Space>
            </Form.Item>
          </div>
          <Form.Item
            label={t("test2.gender")}
            name="gender"
            rules={[{ required: true, message: "Please input your Gender!" }]}
          >
            <Radio.Group onChange={onChangeGender} value={genderValue}>
              <Radio value={"male"}>{t("test2.male")}</Radio>
              <Radio value={"female"}>{t("test2.female")}</Radio>
              <Radio value={"unisex"}>{t("test2.unisex")}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={t("test2.mobilePhone")}
            name="mobilePhone"
            rules={[
              { required: true, message: "Please input your mobilePhone!" },
            ]}
          >
            <div className="boxBD">
              <Form.Item noStyle name="mobilePhoneCode">
                <Select
                  style={{
                    width: "10rem",
                  }}
                  onChange={handleChangeMobile}
                  value={mobileValue}
                  options={phoneOptions}
                  optionRender={(option) => <Space>{option.data.label}</Space>}
                />
              </Form.Item>
              <Typography
                style={{
                  margin: "0px 10px",
                }}
              >
                -
              </Typography>
              <Form.Item
                name="mobileInput"
                style={{
                  width: "15rem",
                  marginBottom: "-10px",
                }}
              >
                <Input />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item label={t("test2.passportNo")} name="passportNo">
            <Input
              style={{
                width: "20rem",
              }}
            />
          </Form.Item>
          <div className="box2">
            <div>
              <Form.Item
                label={t("test2.expectedSalary")}
                name="expectedSalary"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="box2">
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="default"
                  htmlType="reset"
                  onClick={() => form.resetFields()}
                >
                  {t("test2.button.reset")}
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="default" htmlType="submit" onClick={submitData}>
                  {t("test2.button.submit")}
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <div>
        <Form>
          <div className="select1">
            <Form.Item name="selectAll" valuePropName="checked">
              <Checkbox checked={isSelectAll} onChange={handleSelectAll}>
                {t("test2.selectAll")}
              </Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="default" onClick={deleteSelectedRows}>
                {t("test2.button.delete")}
              </Button>
            </Form.Item>
          </div>
        </Form>
        <Table
          className="dataTable"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          rowKey="key"
          showSorterTooltip={{ target: "sorter-icon" }}
          pagination={{
            position: [top],
            itemRender: (page, type, originalElement) => {
              if (type === "prev") {
                return <a>{t("test2.button.prev")}</a>;
              }
              if (type === "next") {
                return <a>{t("test2.button.next")}</a>;
              }
              return originalElement;
            },
          }}
        />
      </div>
    </div>
  );
}

export default Test2;
