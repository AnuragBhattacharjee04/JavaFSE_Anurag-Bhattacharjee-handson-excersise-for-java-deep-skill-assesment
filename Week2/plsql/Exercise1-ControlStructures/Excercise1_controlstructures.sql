
CREATE TABLE customers (
    customer_id   NUMBER PRIMARY KEY,
    name          VARCHAR2(100),
    account_type  VARCHAR2(20),    -- 'SAVINGS' | 'CURRENT'
    balance       NUMBER(12, 2),
    loan_amount   NUMBER(12, 2) DEFAULT 0
);

INSERT INTO customers VALUES (1, 'Alice',   'SAVINGS', 15000, 0);
INSERT INTO customers VALUES (2, 'Bob',     'CURRENT',  5000, 3000);
INSERT INTO customers VALUES (3, 'Charlie', 'SAVINGS',  8000, 0);
INSERT INTO customers VALUES (4, 'Diana',   'SAVINGS', 25000, 5000);
INSERT INTO customers VALUES (5, 'Ethan',   'CURRENT',  2000, 0);
COMMIT;

DECLARE
    v_customer_id  customers.customer_id%TYPE := 1;
    v_balance      customers.balance%TYPE;
    v_account_type customers.account_type%TYPE;
    v_bonus_rate   NUMBER;
    v_bonus        NUMBER;
BEGIN
    SELECT balance, account_type
    INTO   v_balance, v_account_type
    FROM   customers
    WHERE  customer_id = v_customer_id;

    IF v_account_type = 'SAVINGS' AND v_balance > 10000 THEN
        v_bonus_rate := 0.05;   
    ELSIF v_account_type = 'SAVINGS' THEN
        v_bonus_rate := 0.03;   
    ELSIF v_account_type = 'CURRENT' THEN
        v_bonus_rate := 0.01;  
    ELSE
        v_bonus_rate := 0;
    END IF;

    v_bonus := v_balance * v_bonus_rate;

    DBMS_OUTPUT.PUT_LINE('Customer ID  : ' || v_customer_id);
    DBMS_OUTPUT.PUT_LINE('Account Type : ' || v_account_type);
    DBMS_OUTPUT.PUT_LINE('Balance      : ' || v_balance);
    DBMS_OUTPUT.PUT_LINE('Bonus Rate   : ' || (v_bonus_rate * 100) || '%');
    DBMS_OUTPUT.PUT_LINE('Bonus Amount : ' || v_bonus);
END;
/


DECLARE
    v_customer_id  customers.customer_id%TYPE := 3;
    v_balance      customers.balance%TYPE;
    v_eligibility  VARCHAR2(50);
    v_max_loan     NUMBER;
BEGIN
    SELECT balance INTO v_balance
    FROM   customers
    WHERE  customer_id = v_customer_id;

    v_eligibility :=
        CASE
            WHEN v_balance >= 20000 THEN 'PREMIUM'
            WHEN v_balance >= 10000 THEN 'STANDARD'
            WHEN v_balance >= 5000  THEN 'BASIC'
            ELSE 'NOT ELIGIBLE'
        END;

    v_max_loan :=
        CASE v_eligibility
            WHEN 'PREMIUM'  THEN v_balance * 3
            WHEN 'STANDARD' THEN v_balance * 2
            WHEN 'BASIC'    THEN v_balance
            ELSE 0
        END;

    DBMS_OUTPUT.PUT_LINE('Customer     : ' || v_customer_id);
    DBMS_OUTPUT.PUT_LINE('Balance      : ' || v_balance);
    DBMS_OUTPUT.PUT_LINE('Eligibility  : ' || v_eligibility);
    DBMS_OUTPUT.PUT_LINE('Max Loan     : ' || v_max_loan);
END;
/

DECLARE
    v_bonus_rate NUMBER;
    v_bonus      NUMBER;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== Bonus Interest for All Customers ===');
    DBMS_OUTPUT.PUT_LINE('------------------------------------------');

    FOR rec IN (SELECT customer_id, name, balance, account_type FROM customers ORDER BY customer_id)
    LOOP
        IF rec.account_type = 'SAVINGS' AND rec.balance > 10000 THEN
            v_bonus_rate := 0.05;
        ELSIF rec.account_type = 'SAVINGS' THEN
            v_bonus_rate := 0.03;
        ELSE
            v_bonus_rate := 0.01;
        END IF;

        v_bonus := rec.balance * v_bonus_rate;

        DBMS_OUTPUT.PUT_LINE(
            'ID:' || rec.customer_id ||
            ' | ' || RPAD(rec.name, 10) ||
            ' | Bal:' || rec.balance ||
            ' | Bonus:' || ROUND(v_bonus, 2)
        );
    END LOOP;
END;
/

DECLARE
    v_principal    NUMBER := 10000;
    v_rate         NUMBER := 0.08;
    v_target       NUMBER := 20000;
    v_year         NUMBER := 0;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== Years to Double Investment ===');

    WHILE v_principal < v_target
    LOOP
        v_principal := v_principal * (1 + v_rate);
        v_year      := v_year + 1;
        DBMS_OUTPUT.PUT_LINE('Year ' || v_year || ': $' || ROUND(v_principal, 2));
    END LOOP;

    DBMS_OUTPUT.PUT_LINE('Doubled in ' || v_year || ' years!');
END;
/