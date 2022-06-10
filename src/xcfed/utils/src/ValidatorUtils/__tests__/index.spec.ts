import * as ValidatorUtils from '../index';
import moment from 'moment';
import fetchMock from 'fetch-mock';
const ponyfill = require('fetch-ponyfill')();
fetchMock.config = Object.assign(fetchMock.config, {
  Headers: ponyfill.Headers,
  Request: ponyfill.Request,
  Response: ponyfill.Response,
  fetch: ponyfill,
});

const rules = ValidatorUtils;
const Response = ponyfill.Response;

describe.skip('验证方法测试validateSpecialCharacters', () => {
  it('validateSpecialCharacters 正确字符 123456', (done) => {
    const string = '123456';
    rules.validateSpecialCharacters({}, string, (args: any) => {
      expect(args).toEqual(undefined);
      done();
    });
  });
  it('validateSpecialCharacters 正确字符大小写 abcdA', (done) => {
    const string = 'abcdA';
    rules.validateSpecialCharacters({}, string, (args: any) => {
      expect(args).toEqual(undefined);
      done();
    });
  });

  it('validateSpecialCharacters 正确字符中文字符', (done) => {
    const string = '正确字符中文字符';
    rules.validateSpecialCharacters({}, string, (args: any) => {
      expect(args).toEqual(undefined);
      done();
    });
  });

  it('validateSpecialCharacters 允许字符_#$', (done) => {
    const string = '_#$';
    rules.validateSpecialCharacters({}, string, (args: any) => {
      expect(args).toEqual(undefined);
      done();
    });
  });

  it('validateSpecialCharacters 其他非法字符 (),.?', (done) => {
    const string = '(),.?';
    rules.validateSpecialCharacters({}, string, (args: any) => {
      expect(args).toEqual('请不要输入非法字符');
      done();
    });
  });

  it('validateSpecialCharacters 部分包含非法字符 abdf"@"123"."com', (done) => {
    const string = 'abdf@123.com';
    rules.validateSpecialCharacters({}, string, (args: any) => {
      expect(args).toEqual('请不要输入非法字符');
      done();
    });
  });
});
describe.skip('验证方法测试正确性', () => {
  beforeEach(() => {});
  describe('验证checkIP正确性', () => {
    const testData = [
      {
        ip: '192.168.1.1',
        result: undefined,
      },
      {
        ip: '192.1',
        result: 'IP地址不正确',
      },
      {
        ip: '1.1.1.1',
        result: undefined,
      },
      {
        ip: '190.168.0.0.0',
        result: 'IP地址不正确',
      },
    ];
    it(`checkIP[${testData[0].ip}]`, (done) => {
      rules.checkIP({}, testData[0].ip, (args: any) => {
        expect(args).toEqual(testData[0].result);
        done();
      });
    });
    it(`checkIP[${testData[1].ip}]`, (done) => {
      rules.checkIP({}, testData[1].ip, (args: any) => {
        expect(args).toEqual(testData[1].result);
        done();
      });
    });
    it(`checkIP[${testData[2].ip}]`, (done) => {
      rules.checkIP({}, testData[2].ip, (args: any) => {
        expect(args).toEqual(testData[2].result);
        done();
      });
    });
    it(`checkIP[${testData[3].ip}]`, (done) => {
      rules.checkIP({}, testData[3].ip, (args: any) => {
        expect(args).toEqual(testData[3].result);
        done();
      });
    });
  });

  describe('验证validatePort正确性', () => {
    const testData = [
      {
        port: 'a',
        result: '请输入正确的端口',
      },
      {
        port: '1234',
        result: undefined,
      },
      {
        port: '65536',
        result: '请输入正确的端口',
      },
      {
        port: '-8080',
        result: '请输入正确的端口',
      },
      {
        port: '0',
        result: '请输入正确的端口',
      },
      {
        port: '65535',
        result: undefined,
      },
      {
        port: '1.5',
        result: '请输入正确的端口',
      },
      {
        port: '',
        result: undefined,
      },
    ];
    // for(let i=0;i<testData.length;i++){
    //     it(`validatePort[${testData[i].port}]`, (done) => {
    //         rules.validatePort('',testData[i].port,(args)=>{
    //             expect(args).toEqual(testData[i].result)
    //             done()
    //         })
    //     })
    // }
    it(`validatePort[${testData[0].port}]`, (done) => {
      rules.validatePort({}, testData[0].port, (args: any) => {
        expect(args).toEqual(testData[0].result);
        done();
      });
    });
    it(`validatePort[${testData[1].port}]`, (done) => {
      rules.validatePort({}, testData[1].port, (args: any) => {
        expect(args).toEqual(testData[1].result);
        done();
      });
    });
    it(`validatePort[${testData[2].port}]`, (done) => {
      rules.validatePort({}, testData[2].port, (args: any) => {
        expect(args).toEqual(testData[2].result);
        done();
      });
    });
    it(`validatePort[${testData[3].port}]`, (done) => {
      rules.validatePort({}, testData[3].port, (args: any) => {
        expect(args).toEqual(testData[3].result);
        done();
      });
    });
    it(`validatePort[${testData[4].port}]`, (done) => {
      rules.validatePort({}, testData[4].port, (args: any) => {
        expect(args).toEqual(testData[4].result);
        done();
      });
    });
    it(`validatePort[${testData[5].port}]`, (done) => {
      rules.validatePort({}, testData[5].port, (args: any) => {
        expect(args).toEqual(testData[5].result);
        done();
      });
    });
    it(`validatePort[${testData[6].port}]`, (done) => {
      rules.validatePort({}, testData[6].port, (args: any) => {
        expect(args).toEqual(testData[6].result);
        done();
      });
    });

    it(`validatePort[${testData[7].port}]`, (done) => {
      rules.validatePort({}, testData[7].port, (args: any) => {
        expect(args).toEqual(testData[7].result);
        done();
      });
    });
  });

  describe('验证checkIPCust正确性', () => {
    const testData = [
      {
        ip: 'a.b.c',
        result: undefined,
      },
      {
        ip: 'a.b.com',
        result: 'Ip地址不正确',
      },
      {
        ip: '1.1.1.1',
        result: undefined,
      },
      {
        ip: '190.168.0.0.0',
        result: undefined,
      },
    ];
    it(`checkIPCust[${testData[0].ip}]`, (done) => {
      rules.checkIPCust({}, testData[0].ip, (args: any) => {
        expect(args).toEqual(testData[0].result);
        done();
      });
    });
    it(`checkIPCust[${testData[1].ip}]`, (done) => {
      rules.checkIPCust({}, testData[1].ip, (args: any) => {
        expect(args).toEqual(testData[1].result);
        done();
      });
    });
    it(`checkIPCust[${testData[2].ip}]`, (done) => {
      rules.checkIPCust({}, testData[2].ip, (args: any) => {
        expect(args).toEqual(testData[2].result);
        done();
      });
    });
    it(`checkIPCust[${testData[3].ip}]`, (done) => {
      rules.checkIPCust({}, testData[3].ip, (args: any) => {
        expect(args).toEqual(testData[3].result);
        done();
      });
    });
  });

  describe('验证 checkIPorDomain正确性', () => {
    it('validate checkipordomain 纯数字', () => {
      rules.checkIPorDomain({}, '123123', (args: any) => {
        expect(args).toEqual('端口或域名不正确！');
      });
    });

    it('validate checkipordomain 字符串', () => {
      rules.checkIPorDomain({}, 'ddddddwww', (args: any) => {
        expect(args).toEqual('端口或域名不正确！');
      });
    });

    it('validate checkipordomain 合法ip域名', () => {
      rules.checkIPorDomain({}, '192.168.1.2', (args: any) => {
        expect(args).toEqual(undefined);
      });
    });

    it('validate checkipordomain 合法ip域名http', () => {
      rules.checkIPorDomain({}, 'http://192.168.1.2', (args: any) => {
        expect(args).toEqual(undefined);
      });
    });

    it('validate checkipordomain 合法ip域名https', () => {
      rules.checkIPorDomain({}, 'https://192.168.1.2', (args: any) => {
        expect(args).toEqual(undefined);
      });
    });

    it('validate checkipordomain 合法域名', () => {
      rules.checkIPorDomain({}, 'www.baidu.com', (args: any) => {
        expect(args).toEqual(undefined);
      });
    });

    it('validate checkipordomain 合法域名http', () => {
      rules.checkIPorDomain({}, 'http://www.baidu.com', (args: any) => {
        expect(args).toEqual(undefined);
      });
    });

    it('validate checkipordomain 合法域名https', () => {
      rules.checkIPorDomain({}, 'https://www.baidu.com', (args: any) => {
        expect(args).toEqual(undefined);
      });
    });
  });

  describe('验证compareToField 正确性', () => {
    const testData = [
      {
        rule: {
          field: '123',
        },
        value: '123',
        result: undefined,
      },
      {
        rule: {
          field: '123',
        },
        value: '12',
        result: '与需要匹配的字段不相同',
      },
      {
        rule: {
          field: '123',
          message: 'test message',
        },
        value: '12',
        result: 'test message',
      },
      {
        rule: {
          field: '123',
          message: 'test message',
        },
        value: '123',
        result: undefined,
      },
    ];

    it('compareToField test1', () => {
      rules.compareToField(testData[0].rule, testData[0].value, (arg: any) => {
        expect(arg).toEqual(testData[0].result);
      });
    });
    it('compareToField test2', () => {
      rules.compareToField(testData[1].rule, testData[1].value, (arg: any) => {
        expect(arg).toEqual(testData[1].result);
      });
    });
    it('compareToField test3', () => {
      rules.compareToField(testData[2].rule, testData[2].value, (arg: any) => {
        expect(arg).toEqual(testData[2].result);
      });
    });
    it('compareToField test4', () => {
      rules.compareToField(testData[3].rule, testData[3].value, (arg: any) => {
        expect(arg).toEqual(testData[3].result);
      });
    });
  });

  describe('验证checkWeekPassword正确性', () => {
    const testData = [
      {
        value: '123456',
        result: '密码为弱密码！',
      },
      {
        value: '1234567',
        result: undefined,
      },
      {
        value: '12345',
        result: '密码为弱密码！',
      },
      {
        value: '*&',
        result: undefined,
      },
      {
        value: '_',
        result: undefined,
      },
    ];
    it(`checkWeekPassword[${testData[0].value}]`, (done) => {
      rules.checkWeekPassword({}, testData[0].value, (args: any) => {
        expect(args).toEqual(testData[0].result);
        done();
      });
    });
    it(`checkWeekPassword[${testData[1].value}]`, (done) => {
      rules.checkWeekPassword({}, testData[1].value, (args: any) => {
        expect(args).toEqual(testData[1].result);
        done();
      });
    });
    it(`checkWeekPassword[${testData[2].value}]`, (done) => {
      rules.checkWeekPassword({}, testData[2].value, (args: any) => {
        expect(args).toEqual(testData[2].result);
        done();
      });
    });
    it(`checkWeekPassword[${testData[3].value}]`, (done) => {
      rules.checkWeekPassword({}, testData[3].value, (args: any) => {
        expect(args).toEqual(testData[3].result);
        done();
      });
    });
    it(`checkWeekPassword[${testData[4].value}]`, (done) => {
      rules.checkWeekPassword({}, testData[4].value, (args: any) => {
        expect(args).toEqual(testData[4].result);
        done();
      });
    });
  });

  describe('验证checkMobile正确性', () => {
    const testData = [
      {
        value: '12345678991',
        result: undefined,
      },
      {
        value: '00123546921',
        result: '手机号码格式不正确！',
      },
      {
        value: '18868832053',
        result: undefined,
      },
      {
        value: '1886883205a',
        result: '手机号码格式不正确！',
      },
      {
        value: '188688320533',
        result: '手机号码格式不正确！',
      },
    ];
    it(`checkMobile[${testData[0].value}]`, (done) => {
      rules.checkMobile({}, testData[0].value, (args: any) => {
        expect(args).toEqual(testData[0].result);
        done();
      });
    });
    it(`checkMobile[${testData[1].value}]`, (done) => {
      rules.checkMobile({}, testData[1].value, (args: any) => {
        expect(args).toEqual(testData[1].result);
        done();
      });
    });
    it(`checkMobile[${testData[2].value}]`, (done) => {
      rules.checkMobile({}, testData[2].value, (args: any) => {
        expect(args).toEqual(testData[2].result);
        done();
      });
    });
    it(`checkMobile[${testData[3].value}]`, (done) => {
      rules.checkMobile({}, testData[3].value, (args: any) => {
        expect(args).toEqual(testData[3].result);
        done();
      });
    });
    it(`checkMobile[${testData[4].value}]`, (done) => {
      rules.checkMobile({}, testData[4].value, (args: any) => {
        expect(args).toEqual(testData[4].result);
        done();
      });
    });
  });

  describe('验证 checkEmail 正确性', () => {
    it('checkEmail 传入错误邮箱纯数字', () => {
      rules.checkEmail({}, '123123', (args: any) => {
        expect(args).toEqual('邮箱格式不正确！');
      });
    });

    it('checkEmail 传入错误邮箱 格式错误', () => {
      rules.checkEmail({}, '1231@23', (args: any) => {
        expect(args).toEqual('邮箱格式不正确！');
      });
    });

    it('checkEmail 传入正确邮箱格式', () => {
      rules.checkEmail({}, 'aa123123@163.com', (args: any) => {
        expect(args).toEqual(undefined);
      });
    });

    it('checkEmail 1@163.com传入正确邮箱格式', () => {
      rules.checkEmail({}, '1@163.com', (args: any) => {
        expect(args).toEqual(undefined);
      });
    });

    it('checkEmail 传入正确邮箱格式aa123123@163.com.cn', () => {
      rules.checkEmail({}, 'aa123123@163.com.cn', (args: any) => {
        expect(args).toEqual(undefined);
      });
    });
  });

  describe('验证checkIDCard正确性', () => {
    const testData = [
      {
        value: '12345678991',
        result: '身份证号码格式不正确！',
      },
      {
        value: '330681199307108533',
        result: undefined,
      },
      {
        value: '33068119930710853x',
        result: undefined,
      },
      {
        value: '33068119930710853a',
        result: '身份证号码格式不正确！',
      },
    ];
    it(`checkIDCard[${testData[0].value}]`, (done) => {
      rules.checkIDCard({}, testData[0].value, (args: any) => {
        expect(args).toEqual(testData[0].result);
        done();
      });
    });
    it(`checkIDCard[${testData[1].value}]`, (done) => {
      rules.checkIDCard({}, testData[1].value, (args: any) => {
        expect(args).toEqual(testData[1].result);
        done();
      });
    });
    it(`checkIDCard[${testData[2].value}]`, (done) => {
      rules.checkIDCard({}, testData[2].value, (args: any) => {
        expect(args).toEqual(testData[2].result);
        done();
      });
    });
    it(`checkIDCard[${testData[3].value}]`, (done) => {
      rules.checkIDCard({}, testData[3].value, (args: any) => {
        expect(args).toEqual(testData[3].result);
        done();
      });
    });
  });

  describe('验证ranges正确性', () => {
    const testData = [
      {
        range: {
          ranges: [0, 100],
        },
        value: 50,
        result: undefined,
      },
      {
        range: {
          ranges: [0, 100],
        },
        value: 101,
        result: '请输入区间值[0,100]',
      },
      {
        range: {
          ranges: [0, 100],
        },
        value: 1,
        result: undefined,
      },
      {
        range: {
          ranges: 213,
        },
        value: 1,
        result: undefined,
      },
      {
        range: {
          ranges: [1, 2, 3],
        },
        value: 1,
        result: undefined,
      },
    ];
    it(`ranges[${testData[0].value}]`, (done) => {
      rules.ranges(testData[0].range, testData[0].value, (args: any) => {
        expect(args).toEqual(testData[0].result);
        done();
      });
    });
    it(`ranges[${testData[1].value}]`, (done) => {
      rules.ranges(testData[1].range, testData[1].value, (args: any) => {
        expect(args).toEqual(testData[1].result);
        done();
      });
    });
    it(`ranges[${testData[2].value}]`, (done) => {
      rules.ranges(testData[2].range, testData[2].value, (args: any) => {
        expect(args).toEqual(testData[2].result);
        done();
      });
    });

    it('rangs 不为数组 结果为undefined', () => {
      rules.ranges(testData[3].range, testData[3].value, (args: any) => {
        expect(args).toEqual(testData[3].result);
      });
    });
    it('rangs 长度不为2 结果为undefined', () => {
      rules.ranges(testData[4].range, testData[4].value, (args: any) => {
        expect(args).toEqual(testData[4].result);
      });
    });
  });

  describe('验证fileSize正确性', () => {
    const testData = [
      {
        fileSizeData: {
          fileSize: 100,
        },
        file: {
          size: 50,
        },
        result: undefined,
      },
      {
        fileSizeData: {
          fileSize: 100,
        },
        file: {
          size: '50',
        },
        result: undefined,
      },
      {
        fileSizeData: {
          fileSize: 100,
        },
        file: {
          size: 101,
        },
        result: '文件大小不超过 100',
      },
      {
        fileSizeData: {
          fileSize: 100,
        },
        file: {
          size: 'a',
        },
        result: undefined,
      },
    ];
    it(`fileSize[${testData[0].file.size}]`, (done) => {
      rules.fileSize(testData[0].fileSizeData, testData[0], (args: any) => {
        expect(args).toEqual(testData[0].result);
        done();
      });
    });
    it(`fileSize[${testData[1].file.size}]`, (done) => {
      rules.fileSize(testData[1].fileSizeData, testData[1], (args: any) => {
        expect(args).toEqual(testData[1].result);
        done();
      });
    });
    it(`fileSize[${testData[2].file.size}]`, (done) => {
      rules.fileSize(testData[2].fileSizeData, testData[2], (args: any) => {
        expect(args).toEqual(testData[2].result);
        done();
      });
    });
    it(`fileSize[${testData[3].file.size}]`, (done) => {
      rules.fileSize(testData[3].fileSizeData, testData[3], (args: any) => {
        expect(args).toEqual(testData[3].result);
        done();
      });
    });
  });

  describe('验证integer正确性', () => {
    const testData = [
      {
        value: '123456',
        result: undefined,
      },
      {
        value: '*&',
        result: '必须为正整数！',
      },
      {
        value: [1, 2, 3],
        result: undefined,
      },
      {
        value: ['a', 'b', 'c'],
        result: '必须为正整数！',
      },
      {
        value: '_',
        result: '必须为正整数！',
      },
      {
        value: {},
        result: undefined,
      },
    ];
    it(`integer[${testData[0].value}]`, (done) => {
      rules.integer({}, testData[0].value, (args: any) => {
        expect(args).toEqual(testData[0].result);
        done();
      });
    });
    it(`integer[${testData[1].value}]`, (done) => {
      rules.integer({}, testData[1].value, (args: any) => {
        expect(args).toEqual(testData[1].result);
        done();
      });
    });
    it(`integer[${testData[2].value}]`, (done) => {
      rules.integer({}, testData[2].value, (args: any) => {
        expect(args).toEqual(testData[2].result);
        done();
      });
    });
    it(`integer[${testData[3].value}]`, (done) => {
      rules.integer({}, testData[3].value, (args: any) => {
        expect(args).toEqual(testData[3].result);
        done();
      });
    });
    it(`integer[${testData[4].value}]`, (done) => {
      rules.integer({}, testData[4].value, (args: any) => {
        expect(args).toEqual(testData[4].result);
        done();
      });
    });

    it(`integer[${testData[5].value}]`, () => {
      rules.integer({}, testData[5].value, (args: any) => {
        expect(args).toEqual(testData[5].result);
      });
    });
  });

  describe('验证maxLength正确性', () => {
    const testData = [
      {
        rule: {
          value: 10,
        },
        value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        result: '不能大于10项',
      },
      {
        rule: {
          value: 10,
        },
        value: '123456789abc',
        result: '不能大于10项',
      },
      {
        rule: {
          value: 10,
        },
        value: [1, 2, 3],
        result: undefined,
      },
      {
        rule: {
          value: 10,
        },
        value: ['a', 'b', 'c'],
        result: undefined,
      },
    ];
    it(`maxLength[${testData[0].value}]`, (done) => {
      rules.maxLength(testData[0].rule, testData[0].value, (args: any) => {
        expect(args).toEqual(testData[0].result);
        done();
      });
    });
    it(`maxLength[${testData[1].value}]`, (done) => {
      rules.maxLength(testData[0].rule, testData[1].value, (args: any) => {
        expect(args).toEqual(testData[1].result);
        done();
      });
    });
    it(`maxLength[${testData[2].value}]`, (done) => {
      rules.maxLength(testData[0].rule, testData[2].value, (args: any) => {
        expect(args).toEqual(testData[2].result);
        done();
      });
    });
    it(`maxLength[${testData[3].value}]`, (done) => {
      rules.maxLength(testData[0].rule, testData[3].value, (args: any) => {
        expect(args).toEqual(testData[3].result);
        done();
      });
    });
  });

  describe('验证tagMaxLength正确性', () => {
    const testData = [
      {
        value: '1,2,3,4,5,6',
        result: '备注标签最多5项',
      },
      {
        value: '123456',
        result: undefined,
      },
      {
        value: '_,_,_,_,_',
        result: undefined,
      },
    ];
    it(`tagMaxLength[${testData[0].value}]`, (done) => {
      rules.tagMaxLength({}, testData[0].value, (args: any) => {
        expect(args).toEqual(testData[0].result);
        done();
      });
    });
    it(`tagMaxLength[${testData[1].value}]`, (done) => {
      rules.tagMaxLength({}, testData[1].value, (args: any) => {
        expect(args).toEqual(testData[1].result);
        done();
      });
    });
    it(`tagMaxLength[${testData[2].value}]`, (done) => {
      rules.tagMaxLength({}, testData[2].value, (args: any) => {
        expect(args).toEqual(testData[2].result);
        done();
      });
    });
  });

  describe('验证dataRangePicked正确性', () => {
    it('dateRange 日期差不超过1天', () => {
      rules.dateRangePicked(
        {
          days: 1,
        },
        [moment('2019-04-18'), moment('2019-04-20')],
        (args: any) => {
          expect(args).toBe('日期差不能超过1天');
        }
      );
    });

    it('传入符合规则的值不报错', () => {
      rules.dateRangePicked(
        {
          days: 3,
        },
        [moment('2019-04-18'), moment('2019-04-20')],
        (args: any) => {
          expect(args).toBe(undefined);
        }
      );
    });
  });

  describe('验证dateCompare正确性', () => {
    it('datecompare 传入的时间结束时间小于开始时间时报错', () => {
      rules.dateCompare(
        {
          date: moment('2019-04-18'),
          type: 'bigger',
        },
        moment('2019-04-12'),
        (args: any) => {
          expect(args).toBe('结束时间必须大于开始时间！');
        }
      );
    });

    it('datecompare type为bigger传入的时间正确时不报错', () => {
      rules.dateCompare(
        {
          date: moment('2019-04-18'),
          type: 'bigger',
        },
        moment('2019-04-20'),
        (args: any) => {
          expect(args).toBe(undefined);
        }
      );
    });

    it('dateCompare 传入的时间开始时间大于结束时间报错', () => {
      rules.dateCompare(
        {
          date: moment('2019-04-18'),
          type: 'smaller',
        },
        moment('2019-04-20'),
        (args: any) => {
          expect(args).toBe('开始时间必须小于结束时间！');
        }
      );
    });

    it('datecompare type为smaller传入的时间正确时不报错', () => {
      rules.dateCompare(
        {
          date: moment('2019-04-18'),
          type: 'smaller',
        },
        moment('2019-04-16'),
        (args: any) => {
          expect(args).toBe(undefined);
        }
      );
    });

    it('datecompare type为不为smaller和bigger时 不报错', () => {
      rules.dateCompare(
        {
          date: moment('2019-04-18'),
          type: 'aaa',
        },
        moment('2019-04-16'),
        (args: any) => {
          expect(args).toBe(undefined);
        }
      );
    });

    it('datecompare 两个值date为undefined时不报错', () => {
      rules.dateCompare(
        {
          date: undefined,
          type: 'smaller',
        },
        moment('2019-04-16'),
        (args: any) => {
          expect(args).toBe(undefined);
        }
      );
    });

    it('datecompare 两个值date为undefined时不报错', () => {
      rules.dateCompare(
        {
          date: moment('2019-04-18'),
          type: 'smaller',
        },
        undefined,
        (args: any) => {
          expect(args).toBe(undefined);
        }
      );
    });
  });
  describe('remote', () => {
    beforeEach(() => {
      // fetch.resetMocks();
    });

    it(' get请求校验 出错', () => {
      let mockResult = {
        code: 2,
        message: 'ceshishibai1',
      };
      const response = new Response(JSON.stringify(mockResult));
      response.headers.set('Content-Type', 'application/json');

      fetchMock.mock('/tests?test=123', response);

      rules.remote(
        {
          method: 'get',
          url: '/tests',
          field: 'test',
        },
        123,
        (res: any) => {
          expect(res).toEqual(mockResult.message);
        }
      );
    });

    it(' get请求校验 测试成功', () => {
      let mockResult = {
        code: 0,
        message: 'ceshishibai2',
      };
      fetchMock.mock('/tests?test=1234', JSON.stringify(mockResult));

      rules.remote(
        {
          method: 'get',
          field: 'test',
          url: '/tests',
        },
        1234,
        (res: any) => {
          expect(res).toEqual(undefined);
        }
      );
    });

    it(' post请求校验 出错并且params 以json格式传入', () => {
      let mockResult = {
        code: 2,
        message: 'ceshishibai3',
      };
      let options = {
        body: {
          test: 123,
          a: 4,
        },
      };
      fetchMock.mock('/testa', JSON.stringify(mockResult), options);

      rules.remote(
        {
          url: '/testa',
          field: 'test',
          params: {
            a: 4,
          },
        },
        123,
        (res: any) => {
          expect(res).toEqual(mockResult.message);
        }
      );
    });

    it(' post请求校验 测试成功并且params以回调函数形式传入', () => {
      let mockResult = {
        code: 0,
        message: 'ceshishibai4',
      };
      let options = {
        body: {
          test: 123,
          a: 1,
        },
      };
      fetchMock.mock('/testb', JSON.stringify(mockResult), options);

      rules.remote(
        {
          url: '/testb',
          field: 'test',
          params: () => ({a: 1}),
        },
        123,
        (res: any) => {
          expect(res).toEqual(undefined);
        }
      );
    });

    it(' post请求校验 测试成功', () => {
      let mockResult = {
        code: 0,
        message: 'ceshishibai',
      };
      let callback = jest.fn();
      let options = {
        body: {
          test: 123,
        },
      };
      fetchMock.mock('/testbb', JSON.stringify(mockResult));
      rules.remote(
        {
          field: '',
          method: 'post',
          url: '/testbb',
          callback: callback,
        },
        123,
        () => {
          expect(callback.mock.calls.length).toEqual(1);
        }
      );
    });
  });
});
describe.skip('验证validateIpV4V6正确性', () => {
  const testData = [
    {
      ip: '192.168.1.1',
      result: undefined,
    },
    {
      ip: '192.1',
      result: 'Ip地址不正确',
    },
    {
      ip: '1.1.1.1',
      result: undefined,
    },
    {
      ip: '190.168.0.0.0',
      result: 'Ip地址不正确',
    },
    {
      ip: '1080:0:0:0:8:800:200C:417A',
      result: undefined,
    },
    {
      ip: '1080::8:800:200C:417A',
      result: undefined,
    },
    // {
    //   ip: '',
    //   result: 'Ip地址不正确',
    // },
    // {
    //   ip: undefined,
    //   result: 'Ip地址不正确',
    // },
  ];
  testData.forEach((ipdata) => {
    it(`validateIpV4V6[${ipdata.ip}]`, (done) => {
      rules.validateIpV4V6('', ipdata.ip, (args: any) => {
        expect(args).toEqual(ipdata.result);
        done();
      });
    });
  });
});
describe.skip('验证validateIpV4正确性', () => {
  const testData = [
    {
      ip: '192.168.1.1',
      result: undefined,
    },
    {
      ip: '192.1',
      result: 'Ip地址不正确',
    },
    {
      ip: '1.1.1.1',
      result: undefined,
    },
    {
      ip: '190.168.0.0.0',
      result: 'Ip地址不正确',
    },
    {
      ip: '1080:0:0:0:8:800:200C:417A',
      result: 'Ip地址不正确',
    },
    {
      ip: '1080::8:800:200C:417A',
      result: 'Ip地址不正确',
    },
    {
      ip: '',
      result: undefined,
    },
    {
      ip: undefined,
      result: undefined,
    },
  ];
  testData.forEach((ipdata) => {
    it(`validateIpV4[${ipdata.ip}]`, (done) => {
      rules.validateIpV4('', ipdata.ip, (args: any) => {
        expect(args).toEqual(ipdata.result);
        done();
      });
    });
  });
});
describe.skip('验证validateIpV6正确性', () => {
  const testData = [
    {
      ip: '192.168.1.1',
      result: 'Ip地址不正确',
    },
    {
      ip: '192.1',
      result: 'Ip地址不正确',
    },
    {
      ip: '1.1.1.1',
      result: 'Ip地址不正确',
    },
    {
      ip: '190.168.0.0.0',
      result: 'Ip地址不正确',
    },
    {
      ip: '1080:0:0:0:8:800:200C:417A',
      result: undefined,
    },
    {
      ip: '1080::8:800:200C:417A',
      result: undefined,
    },
    {
      ip: '',
      result: undefined,
    },
    {
      ip: undefined,
      result: undefined,
    },
    {
      ip: '192',
      result: 'Ip地址不正确',
    },
  ];
  testData.forEach((ipdata) => {
    it(`validateIpV6[${ipdata.ip}]`, (done) => {
      rules.validateIpV6('', ipdata.ip, (args: any) => {
        expect(args).toEqual(ipdata.result);
        done();
      });
    });
  });
});
describe.skip('验证validateIpSection正确性', () => {
  const testData = [
    {
      ip: '192.168.1.1',
      result: 'Ip地址不正确',
    },
    {
      ip: '192.1',
      result: 'Ip地址不正确',
    },
    {
      ip: '1.1.1.1',
      result: 'Ip地址不正确',
    },
    {
      ip: '190.168.0.0.0',
      result: 'Ip地址不正确',
    },
    {
      ip: '1080:0:0:0:8:800:200C:417A',
      result: 'Ip地址不正确',
    },
    {
      ip: '1080::8:800:200C:417A',
      result: 'Ip地址不正确',
    },

    // {
    //   ip: '',
    //   result: 'Ip地址不正确',
    // },
    // {
    //   ip: undefined,
    //   result: 'Ip地址不正确',
    // },
    // {
    //   ip: '192',
    //   result: 'Ip地址不正确',
    // },
    // {
    //   ip: '192.168.60.*',
    //   result: undefined,
    // },
    // {
    //   ip: '2001::192:202:167:*',
    //   result: undefined,
    // },
  ];
  // console.log(testData);
  testData.forEach((ipdata) => {
    it(`validateIpSection[${ipdata.ip}]`, (done) => {
      rules.validateIpSection('', ipdata.ip, (args: any) => {
        // console.log('ip:', ipdata.ip, 'args', args);
        expect(args).toEqual(ipdata.result);
        done();
      });
    });
  });
});
describe.skip('验证validateMac正确性', () => {
  const testData = [
    {
      mac: '00:0A:02:0B',
      result: 'Mac地址不正确',
    },
    {
      mac: '00:0A:02:0B:03:',
      result: 'Mac地址不正确',
    },
    {
      mac: '00-0A-02-0B-03-',
      result: 'Mac地址不正确',
    },
    {
      mac: '000A020B03',
      result: 'Mac地址不正确',
    },
    {
      mac: '',
      result: undefined,
    },
    {
      mac: undefined,
      result: undefined,
    },
    {
      mac: '00',
      result: 'Mac地址不正确',
    },
    {
      mac: '00:0A:02:0B:03:0C',
      result: undefined,
    },
    {
      mac: '00-0A-02-0B-03-0C',
      result: undefined,
    },
    {
      mac: '000A020B030C',
      result: undefined,
    },
  ];
  testData.forEach((macdata) => {
    it(`validateMac[${macdata.mac}]`, (done) => {
      rules.validateMac('', macdata.mac, (args: any) => {
        expect(args).toEqual(macdata.result);
        done();
      });
    });
  });
});

describe.skip('验证 validateIpV4AndV6 正确性', () => {
  const testData = [
    {
      ip: '',
      result: undefined,
    },
    {
      ip: '192.168.1.1',
      result: undefined,
    },
    {
      ip: '192.168.1.1,192.168.1.2',
      result: undefined,
    },
    {
      ip: '192.168.1.1,2001::192:202:167:1',
      result: undefined,
    },
    {
      ip: '2001::192:202:168:*****6',
      result: 'Ip地址不正确',
    },
    {
      ip: '2001::192:202:168:1,2001::192:202:167:1',
      result: undefined,
    },
    {
      ip: '192.1',
      result: 'Ip地址不正确',
    },
    {
      ip: '190.168.0.0.0',
      result: 'Ip地址不正确',
    },
    {
      ip: '1080:0:0:0:8:800:200C:417AB',
      result: 'Ip地址不正确',
    },
    {
      ip: '1080:::8:800:200C:417A',
      result: 'Ip地址不正确',
    },
    {
      ip: undefined,
      result: undefined,
    },
    {
      ip: '192',
      result: 'Ip地址不正确',
    },
    {
      ip: '192.168.60.*',
      result: 'Ip地址不正确',
    },
    {
      ip: '2001::192:202:167:*',
      result: 'Ip地址不正确',
    },
  ];
  testData.forEach((ipdata) => {
    it(`validateIpV4AndV6[${ipdata.ip}]`, (done) => {
      rules.validateIpV4AndV6('', ipdata.ip, (args: any) => {
        expect(args).toEqual(ipdata.result);
        done();
      });
    });
  });
});
