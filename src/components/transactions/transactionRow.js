import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { translate } from 'react-i18next';
import TransactionType from './transactionType';
import styles from './transactionRow.css';
import Amount from './amount';
import Spinner from '../spinner';
import { DateFromTimestamp } from './../timestamp/index';
import { FontIcon } from '../fontIcon';

class TransactionRow extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  shouldComponentUpdate(nextProps) {
    return nextProps.value.id !== this.props.value.id || nextProps.value.confirmations <= 1000;
  }

  render() {
    const { props } = this;
    const onClick = !props.onClick ? (() => {}) : () => props.onClick(this.props);
    return (
      <div className={`${grid.row} ${styles.rows} ${styles.clickable} transactions-row`} onClick={onClick}>
        <div className={`${styles.leftText} ${grid['col-xs-6']} ${grid['col-sm-6']} transactions-cell`}>
          <div className={`${styles.address}`}>
            <TransactionType {...props.value} address={props.address}></TransactionType>
          </div>
        </div>
        {props.value.asset && props.value.asset.data ?
          <div className={`${styles.rightText} ${grid['col-sm-2']} transactions-cell`}>
            <div className={`${styles.hiddenXs}`}>
              <span className={styles.reference}>{props.value.asset.data}</span>
            </div>
          </div>
        : null}
        <div className={`${styles.rightText} ${grid['col-sm-2']} transactions-cell`}>
          <div className={`${styles.hiddenXs}`}>
            {props.value.confirmations ? <DateFromTimestamp time={props.value.timestamp} />
              : <Spinner />}
          </div>
        </div>
        <div className={`${styles.rightText} ${grid['col-xs-5']} ${grid['col-sm-3']} transactions-cell`}>
          <Amount {...props}></Amount>
        </div>
        <div className={`${styles.rightText} ${grid['col-xs-1']} ${grid['col-sm-1']} transactions-cell`}>
          <FontIcon value='arrow-right'/>
        </div>
      </div>
    );
  }
}

export default translate()(TransactionRow);
