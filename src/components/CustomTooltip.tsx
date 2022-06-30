import moment from 'moment';

const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (!active || !payload || !payload.length) return null;

  let value = payload[0].value;
  if (formatter) {
    value = formatter(value);
  }
  const date = moment(label).format('MMM D, YYYY');

  return (
    <div className="bg-gradient-to-r from-[#474F7E] to-[#343B61] text-xs text-white px-[8px] py-[12px] rounded-md">
      <p>Value: {value}</p>
      <p>{date}</p>
    </div>
  );
};

export default CustomTooltip;
