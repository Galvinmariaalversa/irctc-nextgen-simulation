// disha-chatbot.js - Floating Chatbot Widget for IRCTC
(function() {
    // Inject Styles into Document Head
    const style = document.createElement('style');
    style.innerHTML = `
        /* Chatbot Widget Container */
        #disha-chatbot-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        /* Floating Button styling */
        .disha-chat-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);
            box-shadow: 0 4px 16px rgba(234, 88, 12, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
        }
        
        .disha-chat-btn::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 2px solid #ea580c;
            opacity: 0;
            animation: disha-ping 2s infinite;
        }

        @keyframes disha-ping {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(1.2); opacity: 0; }
        }

        .disha-chat-btn:hover {
            transform: scale(1.08) translateY(-2px);
            box-shadow: 0 6px 20px rgba(234, 88, 12, 0.5);
        }

        .disha-chat-btn svg {
            width: 30px;
            height: 30px;
            fill: white;
            transition: transform 0.3s ease;
        }

        /* Chat Window styling */
        .disha-chat-window {
            position: absolute;
            bottom: 76px;
            right: 0;
            width: 360px;
            height: 480px;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(226, 232, 240, 0.8);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: scale(0.9) translateY(20px);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.15);
            transform-origin: bottom right;
        }

        html.dark .disha-chat-window {
            background: #1e293b;
            border-color: #334155;
        }

        .disha-chat-window.open {
            transform: scale(1) translateY(0);
            opacity: 1;
            pointer-events: auto;
        }

        /* Header styling */
        .disha-chat-header {
            background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
            padding: 16px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .disha-chat-header-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .disha-chat-header-info img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: white;
            padding: 4px;
        }

        .disha-avatar-bot {
            font-size: 20px;
        }

        .disha-chat-status {
            font-size: 11px;
            color: #4ade80;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .disha-chat-close-btn {
            background: transparent;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 20px;
            opacity: 0.8;
            transition: opacity 0.2s;
        }

        .disha-chat-close-btn:hover {
            opacity: 1;
        }

        /* Messages Body styling */
        .disha-chat-messages {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #f8fafc;
        }

        html.dark .disha-chat-messages {
            background: #0f172a;
        }

        /* Message bubbles */
        .disha-msg {
            max-width: 80%;
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 13px;
            line-height: 1.5;
            word-wrap: break-word;
        }

        .disha-msg.bot {
            background: #ffffff;
            color: #1e293b;
            align-self: flex-start;
            border-bottom-left-radius: 2px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            border: 1px solid #f1f5f9;
        }

        html.dark .disha-msg.bot {
            background: #1e293b;
            color: #f8fafc;
            border-color: #334155;
        }

        .disha-msg.user {
            background: #ea580c;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 2px;
            box-shadow: 0 2px 8px rgba(234, 88, 12, 0.25);
        }

        /* Typing indicator */
        .disha-typing {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 8px 12px;
        }

        .disha-typing span {
            width: 6px;
            height: 6px;
            background: #94a3b8;
            border-radius: 50%;
            animation: disha-bounce 1.4s infinite ease-in-out both;
        }

        .disha-typing span:nth-child(1) { animation-delay: -0.32s; }
        .disha-typing span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes disha-bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
        }

        /* Quick Suggestions Buttons */
        .disha-chat-quick {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 6px;
        }

        .disha-quick-btn {
            background: #eff6ff;
            color: #1d4ed8;
            border: 1px solid #bfdbfe;
            border-radius: 16px;
            padding: 6px 12px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        html.dark .disha-quick-btn {
            background: #1e3a8a/30;
            color: #93c5fd;
            border-color: #1e3a8a;
        }

        .disha-quick-btn:hover {
            background: #1d4ed8;
            color: white;
            border-color: #1d4ed8;
        }

        /* Footer Input styling */
        .disha-chat-footer {
            padding: 12px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            gap: 8px;
            background: #ffffff;
        }

        html.dark .disha-chat-footer {
            background: #1e293b;
            border-color: #334155;
        }

        .disha-chat-input {
            flex: 1;
            border: 1.5px solid #cbd5e1;
            border-radius: 20px;
            padding: 8px 16px;
            font-size: 13px;
            outline: none;
            transition: border-color 0.2s;
        }

        html.dark .disha-chat-input {
            background: #0f172a;
            color: white;
            border-color: #334155;
        }

        .disha-chat-input:focus {
            border-color: #ea580c;
        }

        .disha-chat-send-btn {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #ea580c;
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
        }

        .disha-chat-send-btn:hover {
            background: #c2410c;
        }
    `;
    document.head.appendChild(style);

    // Create DOM Structure
    const container = document.createElement('div');
    container.id = 'disha-chatbot-container';
    container.innerHTML = `
        <!-- Floating Chat Button -->
        <div class="disha-chat-btn" id="dishaChatBtn" aria-label="Ask DISHA">
            <svg viewBox="0 0 24 24" id="dishaOpenIcon">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
            </svg>
            <svg viewBox="0 0 24 24" id="dishaCloseIcon" style="display: none; width: 24px; height: 24px;">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        </div>

        <!-- Chat Window -->
        <div class="disha-chat-window" id="dishaChatWindow">
            <div class="disha-chat-header">
                <div class="disha-chat-header-info">
                    <span class="disha-avatar-bot">🤖</span>
                    <div>
                        <h4 class="font-bold text-sm leading-none">Ask DISHA 2.0</h4>
                        <span class="disha-chat-status">🟢 Online</span>
                    </div>
                </div>
                <button class="disha-chat-close-btn" id="dishaCloseBtn">&times;</button>
            </div>
            <div class="disha-chat-messages" id="dishaChatMessages">
                <!-- Welcome bubble -->
                <div class="disha-msg bot shadow-sm">
                    <p class="font-semibold mb-1">Namaskar! 🙏</p>
                    <p>I am **DISHA**, your digital AI railway assistant. How can I help you today?</p>
                    <div class="disha-chat-quick mt-3">
                        <button class="disha-quick-btn" onclick="sendQuickQuery('Check PNR Status')">Check PNR Status</button>
                        <button class="disha-quick-btn" onclick="sendQuickQuery('How to get a Refund?')">How to get a Refund?</button>
                        <button class="disha-quick-btn" onclick="sendQuickQuery('Tatkal Booking Timings')">Tatkal Booking Timings</button>
                        <button class="disha-quick-btn" onclick="sendQuickQuery('Can I cancel a ticket?')">Can I cancel a ticket?</button>
                        <button class="disha-quick-btn" onclick="sendQuickQuery('Talk to helpline')">Helpline Support</button>
                    </div>
                </div>
            </div>
            <form class="disha-chat-footer" id="dishaChatForm">
                <input type="text" class="disha-chat-input" id="dishaChatInput" placeholder="Ask a railway query..." autocomplete="off">
                <button type="submit" class="disha-chat-send-btn">
                    <svg viewBox="0 0 24 24" style="width:16px; height:16px; fill:white;"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(container);

    // Event Listeners
    const btn = document.getElementById('dishaChatBtn');
    const win = document.getElementById('dishaChatWindow');
    const closeBtn = document.getElementById('dishaCloseBtn');
    const openIcon = document.getElementById('dishaOpenIcon');
    const closeIcon = document.getElementById('dishaCloseIcon');
    const form = document.getElementById('dishaChatForm');
    const input = document.getElementById('dishaChatInput');
    const messages = document.getElementById('dishaChatMessages');

    function toggleChat() {
        win.classList.toggle('open');
        if (win.classList.contains('open')) {
            openIcon.style.display = 'none';
            closeIcon.style.display = 'block';
            input.focus();
        } else {
            openIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    }

    btn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        // User message
        appendMessage(text, 'user');
        input.value = '';

        // Bot reply logic
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            const reply = getBotReply(text);
            appendMessage(reply, 'bot');
        }, 1000);
    });

    // Helper functions exposed globally for quick buttons onclick
    window.sendQuickQuery = function(text) {
        appendMessage(text, 'user');
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            const reply = getBotReply(text);
            appendMessage(reply, 'bot');
        }, 800);
    };

    function appendMessage(text, sender) {
        const bubble = document.createElement('div');
        bubble.className = `disha-msg ${sender} shadow-sm`;
        
        // Simple Markdown-like replacement for bold & links
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\📞\s?(\d+)/g, '<a href="tel:$1" class="underline font-bold text-blue-600 dark:text-blue-400">$1</a>');

        bubble.innerHTML = formatted;
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'disha-indicator';
        indicator.className = 'disha-msg bot shadow-sm disha-typing';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        messages.appendChild(indicator);
        messages.scrollTop = messages.scrollHeight;
    }

    function removeTypingIndicator() {
        const el = document.getElementById('disha-indicator');
        if (el) el.remove();
    }

    // Bot Pre-set Knowledge Replies
    function getBotReply(text) {
        const q = text.toLowerCase();
        
        if (q.includes('pnr')) {
            return "You can check your **10-digit PNR status** instantly on the home page. Try testing with confirmed PNR **9876543210** or waitlisted PNR **1234567890** in the Check PNR status tool.";
        }
        if (q.includes('refund')) {
            return "Refunds for cancelled tickets are processed automatically. Money is returned to the original payment source within **3-5 bank working days**. You can track active refunds using the 'Refund Status' tool on the home page.";
        }
        if (q.includes('tatkal')) {
            return "Tatkal bookings open daily:\n- **10:00 AM** for AC Classes (1A, 2A, 3A, CC)\n- **11:00 AM** for Non-AC Classes (SL, 2S)\nTatkal tickets are booked for travel starting on the next calendar day.";
        }
        if (q.includes('cancel')) {
            return "Yes, you can cancel tickets prior to chart preparation (usually 4 hours before train departure). Go to your **My Dashboard** to cancel active bookings. Cancellation charges are:\n- AC 1st Class: ₹240\n- AC 2nd/3rd Class: ₹200\n- Sleeper Class: ₹120";
        }
        if (q.includes('helpline') || q.includes('phone') || q.includes('support') || q.includes('care') || q.includes('human')) {
            return "For live customer assistance, please dial our national railway helpline number **📞 139** (available 24/7 toll-free) or email us at **care@irctc.co.in**.";
        }
        if (q.includes('luggage') || q.includes('limit') || q.includes('weight')) {
            return "Free luggage allowances depend on travel class:\n- AC 1st Class: **70 kg**\n- AC 2nd/3rd Class: **40 kg**\n- Sleeper Class: **35 kg**\nExcess baggage is subject to charge.";
        }
        if (q.includes('hello') || q.includes('hi') || q.includes('namaskar') || q.includes('hey')) {
            return "Namaskar! How can I assist you with your railway enquiries today?";
        }
        
        return "I apologize, I didn't quite catch that. Can you ask about **PNR Status**, **Refunds**, **Tatkal Timings**, **Helpline**, or **Cancellation Rules**?";
    }
})();
