/* eslint-disable  no-useless-escape */
import _isNumber from 'lodash/isNumber';

const required = (value) => (value || _isNumber(value) ? undefined : 'Vui lòng nhập dữ liệu');

export default { required };
