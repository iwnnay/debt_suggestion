#  Performing Calculations

## Basic aommoritization

### Key
| Variable | Value |
| --- | --- |
| I | Interest Rate |
|J|Interest Accrued|
|O|Overpayment|
| P | Monthly Payment |
|R|New Monthly Payment|
|Y|Minimum Payment|
|Z|New Minimum Payment|
|A|APR|
|D|Days in a month|
|M|Amount owed|
|N|New Monthly Amount|

##### Calculate Interest

    I = D X (A / 365)

##### Interest for the month

    J = I X M

##### Adjusted Amount
Interest is considered first before payment. This can elongate bills and gives
way to surprise interest the next month because interest starts accumulating the
day after the month has closed. We needd to account for or warn about this.

    N = J + M - P

## Snowballing Applied

### No Snowballing

##### Original Monthly Payment

    P = Y + O

##### Seconday Monthly Payment

    R = Z + O

### Snowballing

##### Original Monthly Payment

    P = Y + O

##### Seconday Monthly Payment

    R = Y + O

## Calculating Strategies

### Lowest

    Accounts.each.sort(A < B)

## Smart Amoritization (Account Level)(version 1)
This is going to take the snowballing approach and run

    while (Ledger.notPaidOff) {
      Accounts.map(payOffNext()).sort(a.payoffDate < b.payoffDate)
    }

[Main Page](../docs.md)
