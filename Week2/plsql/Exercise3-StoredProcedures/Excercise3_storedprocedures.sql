
CREATE TABLE departments (
    dept_id   NUMBER PRIMARY KEY,
    dept_name VARCHAR2(100),
    location  VARCHAR2(100)
);

CREATE TABLE employees (
    emp_id     NUMBER PRIMARY KEY,
    emp_name   VARCHAR2(100),
    dept_id    NUMBER REFERENCES departments(dept_id),
    salary     NUMBER(10, 2),
    hire_date  DATE DEFAULT SYSDATE
);

INSERT INTO departments VALUES (10, 'Engineering', 'New York');
INSERT INTO departments VALUES (20, 'Marketing',   'Chicago');
INSERT INTO departments VALUES (30, 'HR',          'Dallas');

INSERT INTO employees VALUES (1, 'Alice Johnson', 10, 75000, DATE '2020-01-15');
INSERT INTO employees VALUES (2, 'Bob Smith',     20, 55000, DATE '2019-06-10');
INSERT INTO employees VALUES (3, 'Carol White',   10, 82000, DATE '2021-03-22');
INSERT INTO employees VALUES (4, 'David Brown',   30, 48000, DATE '2022-09-01');
INSERT INTO employees VALUES (5, 'Eva Davis',     20, 61000, DATE '2018-11-30');
COMMIT;

CREATE OR REPLACE PROCEDURE add_employee (
    p_emp_id   IN employees.emp_id%TYPE,
    p_name     IN employees.emp_name%TYPE,
    p_dept_id  IN employees.dept_id%TYPE,
    p_salary   IN employees.salary%TYPE
)
AS
    v_dept_count NUMBER;
BEGIN
    
    SELECT COUNT(*) INTO v_dept_count
    FROM   departments
    WHERE  dept_id = p_dept_id;

    IF v_dept_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Department ID ' || p_dept_id || ' does not exist.');
    END IF;

    INSERT INTO employees (emp_id, emp_name, dept_id, salary)
    VALUES (p_emp_id, p_name, p_dept_id, p_salary);

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Employee "' || p_name || '" added successfully.');
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: Employee ID ' || p_emp_id || ' already exists.');
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
END add_employee;
/

CREATE OR REPLACE PROCEDURE update_salary (
    p_emp_id    IN employees.emp_id%TYPE,
    p_increment IN NUMBER   -- percentage, e.g., 10 means 10%
)
AS
    v_old_salary employees.salary%TYPE;
    v_new_salary employees.salary%TYPE;
BEGIN
    SELECT salary INTO v_old_salary
    FROM   employees
    WHERE  emp_id = p_emp_id;

    v_new_salary := v_old_salary * (1 + p_increment / 100);

    UPDATE employees
    SET    salary = v_new_salary
    WHERE  emp_id = p_emp_id;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Employee ID  : ' || p_emp_id);
    DBMS_OUTPUT.PUT_LINE('Old Salary   : $' || v_old_salary);
    DBMS_OUTPUT.PUT_LINE('Increment    : ' || p_increment || '%');
    DBMS_OUTPUT.PUT_LINE('New Salary   : $' || ROUND(v_new_salary, 2));
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: Employee ID ' || p_emp_id || ' not found.');
END update_salary;
/

CREATE OR REPLACE PROCEDURE get_dept_report (
    p_dept_id        IN  departments.dept_id%TYPE,
    p_dept_name      OUT departments.dept_name%TYPE,
    p_emp_count      OUT NUMBER,
    p_avg_salary     OUT NUMBER,
    p_total_payroll  OUT NUMBER
)
AS
BEGIN
    SELECT dept_name INTO p_dept_name
    FROM   departments
    WHERE  dept_id = p_dept_id;

    SELECT COUNT(*), AVG(salary), SUM(salary)
    INTO   p_emp_count, p_avg_salary, p_total_payroll
    FROM   employees
    WHERE  dept_id = p_dept_id;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Department ID ' || p_dept_id || ' not found.');
END get_dept_report;
/


BEGIN
    add_employee(6, 'Frank Miller', 10, 70000);
    add_employee(7, 'Grace Lee',    20, 59000);
END;
/


BEGIN
    update_salary(1, 10);   -- 10% raise for Alice
    update_salary(99, 5);   -- Non-existent employee
END;
/


DECLARE
    v_name     departments.dept_name%TYPE;
    v_count    NUMBER;
    v_avg      NUMBER;
    v_total    NUMBER;
BEGIN
    get_dept_report(10, v_name, v_count, v_avg, v_total);
    DBMS_OUTPUT.PUT_LINE('=== Department Report ===');
    DBMS_OUTPUT.PUT_LINE('Department  : ' || v_name);
    DBMS_OUTPUT.PUT_LINE('Employees   : ' || v_count);
    DBMS_OUTPUT.PUT_LINE('Avg Salary  : $' || ROUND(v_avg, 2));
    DBMS_OUTPUT.PUT_LINE('Total Payroll: $' || ROUND(v_total, 2));
END;
/

