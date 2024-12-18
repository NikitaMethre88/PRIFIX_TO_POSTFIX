function convert() {
    let prefix = document.getElementById("prefix").value.trim();
    if (!prefix) {
        alert("Please enter a prefix expression.");
        return;
    }

    let steps = [];
    let result = prefixToPostfix(prefix, steps);
    
    // Clear previous animation and result
    document.getElementById("process").innerHTML = "";
    document.getElementById("postfix-output").textContent = "";

    // Animate each step
    animateSteps(steps);
    
    // Display the final postfix expression with animation
    setTimeout(() => {
        document.getElementById("postfix-output").textContent = result;
        document.getElementById("postfix-output").style.opacity = "0";
        document.getElementById("postfix-output").style.transform = "scale(0.5)";
        document.getElementById("postfix-output").style.animation = "finalResultAnimation 1s ease-out forwards";
    }, steps.length * 1000); // Display the result after all steps
}

function prefixToPostfix(prefix, steps) {
    let stack = [];
    let operators = ['+', '-', '*', '/', '^'];

    // Traverse the prefix expression from right to left
    for (let i = prefix.length - 1; i >= 0; i--) {
        let char = prefix[i];

        if (char === ' ') continue; // Skip spaces

        // If character is an operator
        if (operators.includes(char)) {
            // Pop two operands from the stack
            let operand1 = stack.pop();
            let operand2 = stack.pop();
            
            // Concatenate operator and operands in postfix order
            let postfix = operand1 + operand2 + char;
            
            // Push the resulting postfix expression back to the stack
            stack.push(postfix);
            steps.push(`Pop operands: ${operand1}, ${operand2} → Form postfix: ${postfix}`);
        } else {
            // If the character is an operand, push it to the stack
            stack.push(char);
            steps.push(`Push operand: ${char}`);
        }
    }

    // The last item in the stack is the final postfix expression
    return stack.pop();
}

function animateSteps(steps) {
    let processContainer = document.getElementById("process");
    let i = 0;
    
    function showStep() {
        if (i < steps.length) {
            let stepDiv = document.createElement("div");
            stepDiv.classList.add("step");
            stepDiv.textContent = steps[i];
            processContainer.appendChild(stepDiv);
            i++;
            setTimeout(showStep, 1000); // Delay each step by 1 second
        }
    }
    
    showStep();
}
