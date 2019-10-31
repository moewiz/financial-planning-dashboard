import React, { useEffect, useState } from 'react';
import { TemplateContent, TemplateWrapper, TemplateHeader } from './styled';
import { Skeleton } from 'antd';

interface StrategyTemplateProps {
  index: number;
}

const StrategyTemplate = (props: StrategyTemplateProps) => {
  const { index } = props;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // first item
  if (index === 0) {
    return (
      <TemplateWrapper>
        <Skeleton
          loading={loading}
          avatar={{ shape: 'square', size: 'large', className: 'icon-placeholder' }}
          paragraph={{ rows: 2 }}
          active
        >
          <TemplateHeader>
            <img
              alt="Salary sacrifice"
              src={`http://sgp18.siteground.asia/~whistle4/images/1.png`}
              style={{ width: 120, height: 120 }}
              className="fadeInIcon"
            />
            <div className="header-body">
              <div className="header-body--title fadeIn" style={{ animationDelay: '0.75s' }}>
                Salary sacrifice
              </div>
              <div className="header-body--content fadeIn" style={{ animationDelay: '1.5s' }}>
                <b>John Samual,</b> salary sacrifice <b>$10,000 per annum</b> into <br />
                <b>CFS FirstChoice Wholesale Super</b>
              </div>
            </div>
          </TemplateHeader>
        </Skeleton>
        <Skeleton loading={loading} paragraph={{ rows: 4, width: '100%' }} title={false} active>
          <TemplateContent>
            <ul>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2s' }}>
                Reduces your taxable income and thus the amount of income tax you pay. Super contributions are taxed at
                just 15% instead of your marginal tax rate (37% including Medicare levy), so you have more money working
                for you in your investment.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.25s' }}>
                Contributing into superannuation will increase the level of benefits available to you after retirement.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.5s' }}>
                You will have additional exposure to an appropriate level of growth assets, allowing you to maximise the
                long term capital growth potential of your superannuation investments.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.75s' }}>
                You will also continue to have sufficient funds to meet your income requirements after making the
                contributions.
              </li>
            </ul>
          </TemplateContent>
        </Skeleton>
      </TemplateWrapper>
    );
  }

  // second item
  if (index === 1) {
    return (
      <TemplateWrapper>
        <Skeleton
          loading={loading}
          avatar={{ shape: 'square', size: 'large', className: 'icon-placeholder' }}
          paragraph={{ rows: 2 }}
          active
        >
          <TemplateHeader>
            <img
              alt="Salary sacrifice"
              src={`http://sgp18.siteground.asia/~whistle4/images/2.png`}
              style={{ width: 120, height: 120 }}
              className="fadeInIcon"
            />
            <div className="header-body">
              <div className="header-body--title fadeIn" style={{ animationDelay: '0.75s' }}>
                Non-Concessional Contribution
              </div>
              <div className="header-body--content fadeIn" style={{ animationDelay: '1.5s' }}>
                <b>John Samual,</b> Make a non-concessional contribution of <b>$60,000</b> into your new <br />
                <b>Colonial First State FirstChoice Wholesale Super</b> account in the 2019/20 financial year
              </div>
            </div>
          </TemplateHeader>
        </Skeleton>
        <Skeleton loading={loading} paragraph={{ rows: 4, width: '100%' }} title={false} active>
          <TemplateContent>
            <ul>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2s' }}>
                The contribution can be funded from your bank account.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.25s' }}>
                Contributing into superannuation will increase the level of benefits available to you after retirement.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.5s' }}>
                Your contribution will be invested in the superannuation environment where earnings are taxed at a
                maximum rate of 15%. Once these funds are rolled over into pension phase, the benefits would be tax
                free.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.75s' }}>
                Your non-concessional contribution will form part of the tax-free component of your superannuation
                balance.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '3s' }}>
                Increasing the tax-free component reduces the tax payable if your superannuation death benefit is paid
                to a beneficiary who does not meet the definition of dependant for tax purposes.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '3.25s' }}>
                You will have additional exposure to an appropriate level of growth assets, allowing you to maximise the
                long term capital growth potential of your superannuation investments.
              </li>
            </ul>
          </TemplateContent>
        </Skeleton>
      </TemplateWrapper>
    );
  }

  // third item
  if (index === 2) {
    return (
      <TemplateWrapper>
        <Skeleton
          loading={loading}
          avatar={{ shape: 'square', size: 'large', className: 'icon-placeholder' }}
          paragraph={{ rows: 2 }}
          active
        >
          <TemplateHeader>
            <img
              alt="Salary sacrifice"
              src={`http://sgp18.siteground.asia/~whistle4/images/3.png`}
              style={{ width: 120, height: 120 }}
              className="fadeInIcon"
            />
            <div className="header-body">
              <div className="header-body--title fadeIn" style={{ animationDelay: '0.75s' }}>
                Establish a pension
              </div>
              <div className="header-body--content fadeIn" style={{ animationDelay: '1.5s' }}>
                <b>John Samual,</b> Rollover your existing <b>CFS FirstChoice Wholesale Personal Super</b> into <br />a
                new <b>CFS FirstChoice Wholesale Pension</b> upon your retirement in 2023.
              </div>
            </div>
          </TemplateHeader>
        </Skeleton>
        <Skeleton loading={loading} paragraph={{ rows: 4, width: '100%' }} title={false} active>
          <TemplateContent>
            <ul>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2s' }}>
                Elect to drawdown pension income payment to meet your cash flow needs.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.25s' }}>
                Auto-rebalance your investment on an annual basis. You can vary the amount you draw each year and make
                lump sum withdrawals to meet your changing needs.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.5s' }}>
                As you will be over 60 in 2023, the pension payments and lump sum withdrawals will be tax-free.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.75s' }}>
                Earnings and capital gains on assets underlying the pension are exempt from tax which helps to increase
                the overall return of your investment portfolio. As opposed to superannuation where earnings and capital
                gains are taxed at 15% (for investments held over a year, capital gains would be taxed at 10%).
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '3s' }}>
                Establish a binding death benefit nomination. A valid binding nomination ensures that in the event of
                your death, your accumulated benefit will be paid direct from your pension to your estate.
              </li>
            </ul>
          </TemplateContent>
        </Skeleton>
      </TemplateWrapper>
    );
  }

  // fourth item
  if (index === 3) {
    return (
      <TemplateWrapper>
        <Skeleton
          loading={loading}
          avatar={{ shape: 'square', size: 'large', className: 'icon-placeholder' }}
          paragraph={{ rows: 2 }}
          active
        >
          <TemplateHeader>
            <img
              alt="Salary sacrifice"
              src={`http://sgp18.siteground.asia/~whistle4/images/4.png`}
              style={{ width: 120, height: 120 }}
              className="fadeInIcon"
            />
            <div className="header-body">
              <div className="header-body--title fadeIn" style={{ animationDelay: '0.75s' }}>
                Debt reduction
              </div>
              <div className="header-body--content fadeIn" style={{ animationDelay: '1.5s' }}>
                <b>John Samual,</b> Utilize <b>$70,000 per annum</b> from your Bank account <br />
                to make a <b>lump sum repayment</b> towards your home loan.
              </div>
            </div>
          </TemplateHeader>
        </Skeleton>
        <Skeleton loading={loading} paragraph={{ rows: 4, width: '100%' }} title={false} active>
          <TemplateContent>
            <ul>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2s' }}>
                This strategy will save you an estimated $80,441 in interest over the next 10 years.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.25s' }}>
                Additional loan repayments effectively provide a tax-free return through a low-risk strategy.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.5s' }}>
                We estimate you will be able to clear this debt by 2038 if repayments and interest rates stay the same.
              </li>
            </ul>
          </TemplateContent>
        </Skeleton>
      </TemplateWrapper>
    );
  }

  // fifth item
  if (index === 4) {
    return (
      <TemplateWrapper>
        <Skeleton
          loading={loading}
          avatar={{ shape: 'square', size: 'large', className: 'icon-placeholder' }}
          paragraph={{ rows: 2 }}
          active
        >
          <TemplateHeader>
            <img
              alt="Salary sacrifice"
              src={`http://sgp18.siteground.asia/~whistle4/images/5.png`}
              style={{ width: 120, height: 120 }}
              className="fadeInIcon"
            />
            <div className="header-body">
              <div className="header-body--title fadeIn" style={{ animationDelay: '0.75s' }}>
                Insurance
              </div>
              <div className="header-body--content fadeIn" style={{ animationDelay: '1.5s' }}>
                <b>John Samual,</b> Retain your existing OnePath OneCare Trauma, life and TPD insurance covers.. <br />
                to be <b>summarize later...</b>
              </div>
            </div>
          </TemplateHeader>
        </Skeleton>
        <Skeleton loading={loading} paragraph={{ rows: 4, width: '100%' }} title={false} active>
          <TemplateContent>
            <ul>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2s' }}>
                Life insurance pays a lump sum or instalment benefit if you die or suffer from a terminal condition.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.25s' }}>
                TPD insurance pays a lump sum or instalment benefit if you suffer from an illness or injury that leaves
                you totally and permanently disabled and unable to work again.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.5s' }}>
                Trauma insurance pays a lump sum or instalment benefit if you suffer from a listed condition such as
                heart attack, cancer or stroke.
              </li>
              <li className="animated fadeInUp faster" style={{ animationDelay: '2.75s' }}>
                Income protection pays up to the recommended monthly benefit if you are unable to work because of
                illness or injury.
              </li>
            </ul>
          </TemplateContent>
        </Skeleton>
      </TemplateWrapper>
    );
  }

  // sixth item
  return (
    <TemplateWrapper>
      <Skeleton
        loading={loading}
        avatar={{ shape: 'square', size: 'large', className: 'icon-placeholder' }}
        paragraph={{ rows: 2 }}
        active
      >
        <TemplateHeader>
          <img
            alt="Salary sacrifice"
            src={`http://sgp18.siteground.asia/~whistle4/images/6.png`}
            style={{ width: 120, height: 120 }}
            className="fadeInIcon"
          />
          <div className="header-body">
            <div className="header-body--title fadeIn" style={{ animationDelay: '0.75s' }}>
              Estate Planning
            </div>
            <div className="header-body--content fadeIn" style={{ animationDelay: '1.5s' }}>
              <b>John Samual,</b> Nominate your estate as binding beneficiary of your Colonial First State... <br />
              to be <b>summarize later...</b>
            </div>
          </div>
        </TemplateHeader>
      </Skeleton>
      <Skeleton loading={loading} paragraph={{ rows: 4, width: '100%' }} title={false} active>
        <TemplateContent>
          <ul>
            <li className="animated fadeInUp faster" style={{ animationDelay: '2s' }}>
              A valid binding nomination effectively binds the super fund trustee to pay your superannuation death
              benefit in accordance with your wishes.
            </li>
            <li className="animated fadeInUp faster" style={{ animationDelay: '2.25s' }}>
              An Enduring Power of Attorney lets you choose someone to make financial or legal decisions on your behalf.
              This Power continues even if you lose mental capacity.
            </li>
            <li className="animated fadeInUp faster" style={{ animationDelay: '2.5s' }}>
              Having your Will properly drafted by a solicitor increases the likelihood that your assets will be
              distributed the way you want and simplifies the administration of your estate.
            </li>
          </ul>
        </TemplateContent>
      </Skeleton>
    </TemplateWrapper>
  );
};

export default StrategyTemplate;
