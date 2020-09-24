import React, { Component } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import ReactHighcharts from "react-highcharts";
import ProductService from "../Services/ProductService";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      series: [],
    };
  }
  onFinish = async (values) => {
    const response = await ProductService.productDetails(values);
    const rankInfo = response.data.rankInfo;
    let categories = [];
    let series = [];
    rankInfo.map((r) => {
      const date = new Date(r.data);
      categories.push(date);
      series.push(r.absolute_position);
    });

    this.setState({ categories, series });
  };
  render() {
    const { categories, series } = this.state;
    const config = {
      xAxis: {
        categories: categories,
      },
      series: [
        {
          data: series,
        },
      ],
    };

    return (
      <Row gutter={8}>
        <Col span={24}>
          <ReactHighcharts config={config} />
        </Col>
        <Col span={24}>
          <Form
            ref={this.formRef}
            name="filters_form"
            initialValues={{}}
            onFinish={this.onFinish}
          >
            <Row>
              <Col lg={{ span: 20 }} xl={{ span: 20 }} xxl={{ span: 12 }}>
                <Form.Item
                  name="keyword"
                  label="Keyword"
                  rules={[
                    {
                      required: true,
                      message: "Please input keyword",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="asin"
                  label="Asin"
                  rules={[
                    {
                      required: true,
                      message: "Please input Asin",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col
                md={{ span: 24 }}
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                xxl={{ span: 12 }}
              >
                <Button type="primary" htmlType="submit" className="pull-right">
                  Save Keywords
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}
export default Dashboard;
