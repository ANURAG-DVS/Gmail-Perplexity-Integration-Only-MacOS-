-- Hammerspoon automation for "Gmail + Perplexity"
-- Global hotkey: control+option+command+y

local mod = {}

local chooser = nil
local sexyView = nil
 
local projectPath = "/Users/anurag/Documents/Gmail + Perplexity"
local outputFile = projectPath .. "/output.txt"

local urls = {
	personal = "https://script.google.com/macros/s/AKfycbzxfp0t_3kOLM9-FBPj-gQJ52tbTDIENoSzKFPbwyaZCqeh_JLOWDwzK5SpSNKAJF1R/exec",
	work = "https://script.google.com/macros/s/AKfycbyWs1tAfC3uhyu44-Ps-Xc-gwyA0Ap-MBgbxz2y3-1RT4ApeYrauaQZHusseVOZ-69z/exec",
}

local function writeToFile(path, text)
	local file = io.open(path, "w")
	if not file then return false, "Unable to open file for writing: " .. tostring(path) end
	file:write(text)
	file:close()
	return true
end

local function notify(title, sub)
	hs.notify.new({
		title = title,
		informativeText = sub or "",
		withdrawAfter = 4,
	}):send()
end

local function focusPerplexityAndPaste(text)
	-- Copy to clipboard first
	hs.pasteboard.setContents(text)

	-- Try to launch Perplexity by name or bundle ID
	local launched = hs.application.launchOrFocus("Perplexity")
	if not launched then
		hs.application.launchOrFocusByBundleID("ai.perplexity.mac")
	end

	-- Give the app a moment to focus
	hs.timer.doAfter(0.6, function()
		-- Try to start a new chat if available
		hs.eventtap.keyStroke({"cmd"}, "n", 0)

		-- Small delay to ensure input is focused
		hs.timer.doAfter(0.2, function()
			hs.eventtap.keyStroke({"cmd"}, "v", 0)
			hs.timer.doAfter(0.1, function()
				hs.eventtap.keyStroke({}, "return", 0)
			end)
		end)
	end)
end

local function runFlow(kind)
	local url = urls[kind]
	if not url then
		notify("Gmail + Perplexity", "Invalid selection")
		return
	end

	notify("Gmail + Perplexity", "Fetching " .. kind .. " unread emails…")

	hs.http.asyncGet(url, nil, function(status, body, headers)
		if status ~= 200 or not body or #body == 0 then
			notify("Fetch failed", "Status: " .. tostring(status))
			return
		end

		-- Persist to txt file
		local ok, err = writeToFile(outputFile, body)
		if not ok then
			notify("File write failed", tostring(err))
			return
		end

		notify("Fetched", "Saved to output.txt and copying to Perplexity…")
		focusPerplexityAndPaste(body)
	end)
end

-- Classic chooser fallback (kept for reference)
local function buildChooser()
	chooser = hs.chooser.new(function(choice)
		if not choice then return end
		runFlow(choice.id)
	end)

	chooser:choices({
		{ text = "Personal Mail", subText = "Run Apps Script for personal inbox", id = "personal" },
		{ text = "Work Mail",     subText = "Run Apps Script for work inbox",     id = "work" },
	})

	chooser:width(30)
	chooser:rows(3)
	chooser:placeholderText("Select mailbox to summarize…")
end

-- Sexy glassmorphic webview chooser
local function centerRect(width, height)
	local screen = hs.screen.mainScreen():frame()
	local x = screen.x + math.floor((screen.w - width) / 2)
	local y = screen.y + math.floor((screen.h - height) / 2)
	return { x = x, y = y, w = width, h = height }
end

local function closeSexyView()
	if sexyView then
		sexyView:delete()
		sexyView = nil
	end
end

local function showSexyChooser()
	if sexyView then
		closeSexyView()
	end

	local rect = centerRect(720, 420)
	local html = [[
		<!doctype html>
		<html>
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>Gmail + Perplexity</title>
			<style>
				:root {
					--bg: #0f1115;
					--card: rgba(255,255,255,0.06);
					--border: rgba(255,255,255,0.12);
					--accent: #7c5cff;
					--accent-2: #00d4ff;
					--text: #e6e8ef;
					--muted: #a8adbd;
				}
				html,body { height:100%; }
				body {
					margin:0; font-family:-apple-system, system-ui, "SF Pro", Inter, Segoe UI, Roboto, sans-serif;
					background: radial-gradient(1000px 600px at 10% -10%, rgba(124,92,255,0.22), transparent 60%),
						radial-gradient(800px 500px at 100% 0%, rgba(0,212,255,0.2), transparent 50%),
						linear-gradient(180deg, #0f1115 0%, #0b0d12 100%);
					color: var(--text);
					-webkit-user-select: none; user-select: none;
				}
				.wrapper { height:100%; display:flex; align-items:center; justify-content:center; padding: 24px; }
				.panel {
					width: 680px; padding: 24px 24px 28px; border-radius: 16px;
					background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
					border: 1px solid var(--border);
					box-shadow: 0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08);
					backdrop-filter: blur(14px);
				}
				.header { display:flex; align-items:center; justify-content:space-between; margin-bottom: 18px; }
				.title { font-weight: 700; letter-spacing: 0.2px; }
				.kbd { opacity: 0.9; color: var(--muted); font-size: 12px; }
				.grid { display:grid; grid-template-columns: 1fr 1fr; gap:16px; }
				.card {
					position: relative; border-radius: 14px; padding: 20px; height: 200px;
					background: var(--card);
					border: 1px solid var(--border);
					box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
					transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
					cursor: pointer;
					overflow: hidden;
				}
				.card:hover { transform: translateY(-2px); border-color: rgba(124,92,255,0.5);
					box-shadow: 0 12px 30px rgba(124,92,255,0.18), inset 0 1px 0 rgba(255,255,255,0.12);
				}
				.badge { position: absolute; top: 14px; right: 14px; padding: 6px 10px; border-radius: 999px;
					font-size: 11px; background: linear-gradient(90deg, rgba(124,92,255,0.25), rgba(0,212,255,0.25));
					border: 1px solid rgba(255,255,255,0.12);
				}
				.card h2 { margin: 8px 0 6px; font-size: 20px; }
				.card p { margin: 0; color: var(--muted); }
				.accent {
					position:absolute; inset:auto -20% -40% -20%; height: 60%;
					background: radial-gradient(60% 70% at 50% 100%, rgba(124,92,255,0.35), transparent 60%),
						radial-gradient(50% 60% at 80% 100%, rgba(0,212,255,0.30), transparent 60%);
					filter: blur(22px); opacity: 0.9; pointer-events:none;
				}
				.footer { margin-top: 18px; display:flex; align-items:center; justify-content:space-between; color: var(--muted); font-size: 12px; }
				.tip { opacity: 0.9; }
				.btn { color: var(--text); opacity: 0.9; text-decoration: none; border-bottom: 1px dashed rgba(255,255,255,0.2); }
			</style>
		</head>
		<body>
			<div class="wrapper">
				<div class="panel">
					<div class="header">
						<div class="title">Gmail + Perplexity</div>
						<div class="kbd">ctrl ⌃  option ⌥  cmd ⌘  Y</div>
					</div>
					<div class="grid">
						<a class="card" href="hs://select/personal">
							<div class="badge">Personal</div>
							<h2>Personal Mail</h2>
							<p>Summarize top 20 unread from personal inbox.</p>
							<div class="accent"></div>
						</a>
						<a class="card" href="hs://select/work">
							<div class="badge">Work</div>
							<h2>Work Mail</h2>
							<p>Summarize top 20 unread from work inbox.</p>
							<div class="accent"></div>
						</a>
					</div>
					<div class="footer">
						<div class="tip">Esc to close • Enter selects focused card</div>
						<a class="btn" href="hs://close">Close</a>
					</div>
				</div>
			</div>
			<script>
				// Keyboard support: left/right + enter
				let idx = 0; const cards = Array.from(document.querySelectorAll('.card'));
				const focusCard = () => { cards.forEach((c,i)=>c.style.outline = i===idx ? '2px solid rgba(124,92,255,0.8)' : 'none'); };
				focusCard();
				document.addEventListener('keydown', (e)=>{
					if(e.key==='ArrowRight'){ idx=(idx+1)%cards.length; focusCard(); }
					if(e.key==='ArrowLeft'){ idx=(idx+cards.length-1)%cards.length; focusCard(); }
					if(e.key==='Enter'){ window.location.href = cards[idx].getAttribute('href'); }
					if(e.key==='Escape'){ window.location.href = 'hs://close'; }
				});
			</script>
		</body>
		</html>
	]]

	sexyView = hs.webview.new(rect)
		:windowStyle({"titled","closable","nonactivating"})
		:title("Gmail + Perplexity")
		:allowTextEntry(true)
		:shadow(true)
		:html(html)
		:bringToFront(true)
		:show()

	sexyView:navigationCallback(function(action, wv, nav)
		local u = nav.URL or ""
		if u:match("^hs://close") then
			closeSexyView()
			return false
		end
		local sel = u:match("^hs://select/(%w+)")
		if sel then
			closeSexyView()
			hs.timer.doAfter(0.05, function() runFlow(sel) end)
			return false
		end
		return true
	end)
end

function mod.trigger()
	-- Prefer sexy chooser; fallback to classic chooser if webview fails
	local ok, err = pcall(showSexyChooser)
	if not ok then
		if not chooser then buildChooser() end
		chooser:show()
	end
end

-- Bind hotkey: control+option+command+y
mod.hyper = {"ctrl","alt","cmd"}
mod.key = "y"

function mod.bindHotkey()
	hs.hotkey.bind(mod.hyper, mod.key, function()
		mod.trigger()
	end)
end

-- Auto-bind on load
mod.bindHotkey()

return mod