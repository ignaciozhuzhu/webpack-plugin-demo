import DictUtils from '../index';
// const {getDictLabel,getDictList} = DictUtils

describe('DictUtils', () => {
  const dictData = {
    riskLevel: [
      {value: '1', label: '极低'},
      {value: '2', label: '低'},
      {value: '3', label: '中'},
      {value: '4', label: '高'},
      {value: '5', label: '极高'},
    ],
  };
  it('getDictList 正常获取', (done) => {
    const demoObj = [
      {value: '1', label: '极低'},
      {value: '2', label: '低'},
      {value: '3', label: '中'},
      {value: '4', label: '高'},
      {value: '5', label: '极高'},
    ];
    const result = DictUtils.getDictList(dictData, 'riskLevel');
    expect(result).toEqual(demoObj);
    done();
  });

  it('getDictList 异常获取', (done) => {
    const demoObj: any[] = [];
    const result = DictUtils.getDictList(dictData, 'noEqual');
    expect(result).toEqual(demoObj);
    done();
  });

  it('getDictLabel 正常获取', (done) => {
    const demoObj = '极低';
    const result = DictUtils.getDictLabel(dictData, 'riskLevel', '1');
    expect(result).toEqual(demoObj);
    done();
  });

  it('getDictLabel 异常获取', (done) => {
    const demoObj = '';
    const result = DictUtils.getDictLabel(dictData, 'riskLevel', '-1');
    expect(result).toEqual(demoObj);
    done();
  });
});
