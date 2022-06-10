localize: {
}
export default abstract class DictUtils {
  static getDictList(
    dictData: {
      [k: string]: any;
    },
    dictName: string
  ): Array<String> {
    return dictData[dictName] || [];
  }

  static getDictLabel(
    dictData: {
      [k: string]: any;
    },
    dictName: string,
    value: any
  ): String {
    let label: String = '';
    const map: Array<String> = this.getDictList(dictData, dictName);
    map.forEach((arr: any) => {
      if (arr.value === value) {
        label = arr.label;
      }
    });
    return label;
  }
}
