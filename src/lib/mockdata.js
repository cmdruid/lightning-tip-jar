
function createUnixTime (
  secsAgo=0, 
  minutesAgo=0, 
  hoursAgo=0, 
  daysAgo=0,
) {
    /*
      LNbits returns the payment time as a unix timestamp.
      This helps convert js date to unix timestamp.
    */

    let now = new Date();

    if (secsAgo)    now.setSeconds(now.getSeconds() - secsAgo);
    if (minutesAgo) now.setMinutes(now.getMinutes() - minutesAgo);
    if (hoursAgo)   now.setHours(now.getHours() - hoursAgo);
    if (daysAgo)    now.setDate(now.getDate() - daysAgo);
    
    return Math.floor(now / 1000);
}

function createPayment() {

}

export function mockPayments() {
  /*
    
    This is a mock data generator.
      return mock data on the api/getTransactions endpoint
      for testing purposes, e.g.:
        - large amounts
        - long messages, emojis, html, etc.
        - control the datetimes, e.g. set to recently

    Simply edit this function directly (and use the helper functions)
    to generate mock data you need. Set the MOCK_PAYMENTS environment
    variable to true to enable this.

  */
 
  let payment = null
  let payments = [];

  payment = {
    amount: 1775 * 1000,
    msg: "cool bar",
    date: createUnixTime(20,0,0,0),
  }
  payments.push(payment)

  payment = {
    amount: 66 * 1000,
    msg: "JJ is da man 🤟 ",
    date: createUnixTime(45,0,0,0),
  }
  payments.push(payment)
  
  payment = {
    amount: 40 * 1000,
    msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ullam repudiandae cupiditate placeat rem nisi nemo aut tenetur delectus optio distinctio nesciunt ipsam ipsa, aperiam libero vero iste ab.",
    date: createUnixTime(0,40,0,0),
  }
  payments.push(payment)

  payment = {
    amount: 34050600 * 1000,
    msg: "Nice work! 🤩",
    date: createUnixTime(0,0,1,0),
  }
  payments.push(payment)

  payment = {
    amount: 17 * 1000,
    msg: "",
    date: createUnixTime(0,0,6,2),
  }
  payments.push(payment)

  payment = {
    amount: 34 * 1000,
    msg: "btcpp",
    date: createUnixTime(0,0,3,2),
  }
  payments.push(payment)


  return payments;
}

export function mockWithdraws() {
  /*
    same as mockPayments() but for withdraws
  */
    let withdraw = null;
    let withdraws = [];

    withdraw = {
      amount: 8000 * 1000,
      msg: "carol cashing out",
      date: createUnixTime(0,2,0,0),
    }
    withdraws.push(withdraw)

    withdraw = {
      amount: 8000 * 1000,
      msg: "alice 4pm - 10pm cash out",
      date: createUnixTime(0,3,0,0),
    }
    withdraws.push(withdraw)

    withdraw = {
      amount: 8000 * 1000,
      msg: "carol cash out",
      date: createUnixTime(0,3,1,0),
    }
    withdraws.push(withdraw)

    withdraw = {
      amount: 8000 * 1000,
      msg: "bob tips",
      date: createUnixTime(0,4,1,0),
    }
    withdraws.push(withdraw)

}