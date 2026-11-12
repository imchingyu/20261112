let backgroundImage; // 儲存畫布背景圖片。
let stopSheet; // 儲存停止動畫的水平精靈圖。
let walkSheet; // 儲存行走動畫的水平精靈圖。
let runSheet; // 儲存跑步動畫的水平精靈圖。
let jumpSheet; // 儲存跳躍動畫的水平精靈圖。
let fallSheet; // 儲存角色 1 被擊倒時的水平精靈圖。
let pushSheet; // 儲存發功動作的水平精靈圖。
let effectSheet; // 儲存向前發射的特效精靈圖。
let character2StopSheet; // 儲存角色 2 的停止動畫精靈圖。
let character2CorrectSheet; // 儲存角色 2 答對時的動畫精靈圖。
let character2IncorrectSheet; // 儲存角色 2 答錯時的動畫精靈圖。
let character2EffectSheet; // 儲存角色 2 攻擊特效精靈圖。
let characterX; // 儲存角色在畫布中的水平中心位置。
let characterStartX; // 儲存角色 1 返回用的起始水平位置。
let fallStartX; // 儲存角色 1 開始被擊倒時的水平位置。
let characterY; // 儲存角色圖片底部在畫布中的垂直位置。
let character2X; // 儲存角色 2 在畫布中的水平中心位置。
let quizActive = false; // 記錄選擇題是否正在顯示。
let currentQuizQuestion; // 儲存目前顯示的英文單字題。
let quizAnsweredForEncounter = false; // 避免角色仍在附近時重複出題。
let character2Action = "stop"; // 記錄角色 2 的停止、答對或答錯動畫狀態。
let characterYOffset = 0; // 儲存角色跳躍時相對於地面的垂直位移。
let jumpVelocity = 0; // 儲存角色目前的垂直跳躍速度。
let isJumping = false; // 記錄角色目前是否正在跳躍。
let isFalling = false; // 記錄角色 1 是否正在被擊倒並返回起點。
let fallAnimationStartFrame = 0; // 記錄角色 1 倒地動畫的起始畫格。
let upKeyWasDown = false; // 記錄上一畫格是否按住向上鍵，避免長按連續跳躍。
let isPushing = false; // 記錄空白鍵是否按住，以控制發功動畫。
let pushAnimationTimer = 0; // 記錄空白鍵放開後仍需播放的發功動畫畫格數。
let effectX = 0; // 儲存發射特效目前的水平位置。
let effectY = 0; // 儲存發射特效目前的垂直位置。
let effectFacing = 1; // 記錄發射特效的飛行方向。
let effectActive = false; // 記錄畫面上是否有正在飛行的特效。
let effectAnimationStartFrame = 0; // 記錄角色 1 發射特效的起始畫格。
let character2ActionStartFrame = 0; // 記錄角色 2 答題動作與攻擊特效的起始畫格。
let facing = -1; // 記錄角色方向，初始面向左側的角色 2。
const STOP_FRAME_COUNT = 6; // 設定停止精靈圖中的影格數。
const WALK_FRAME_COUNT = 6; // 設定行走精靈圖中的影格數，依實際圖片共有六格設定。
const RUN_FRAME_COUNT = 6; // 設定跑步精靈圖中的影格數。
const JUMP_FRAME_COUNT = 6; // 設定跳躍精靈圖中的影格數。
const FALL_FRAME_COUNT = 6; // 設定倒地精靈圖中的影格數。
const PUSH_FRAME_COUNT = 4; // 設定發功精靈圖中的影格數。
const EFFECT_FRAME_COUNT = 4; // 設定發射特效精靈圖中的影格數。
const CHARACTER2_STOP_FRAME_COUNT = 5; // 設定角色 2 停止動畫的影格數。
const CHARACTER2_ACTION_FRAME_COUNT = 4; // 設定角色 2 答題動畫的影格數。
const CHARACTER2_EFFECT_FRAME_COUNT = 4; // 設定角色 2 攻擊特效的影格數。
const CHARACTER_SCALE = 2; // 將兩個角色放大為原本的兩倍尺寸。
const CHARACTER2_ACTION_CYCLES = 4; // 設定角色 2 答題結果動畫播放四輪。
const MOVE_SPEED = 3; // 設定每次繪圖時角色移動的像素數。
const RUN_SPEED = 6; // 設定按住 Shift 並移動時每次繪圖的像素數。
const EFFECT_SPEED = 10; // 設定發射特效每次繪圖向前移動的像素數。
const JUMP_INITIAL_VELOCITY = -22; // 提高跳躍開始時向上的初始速度，讓角色跳得更高。
const JUMP_GRAVITY = 0.7; // 設定每次繪圖時向下增加的重力速度。
const ANIMATION_FRAME_DELAY = 4; // 加快動畫影格切換，讓角色動作更流暢。
const ATTACK_ANIMATION_CYCLES = 2; // 設定發功與攻擊動畫最多播放兩輪。
const CHARACTER2_APPROACH_DISTANCE = 1; // 角色 1 到達不重疊的最近距離時，以 1 像素容差觸發答題。
const QUIZ_QUESTIONS = [ // 設定適合國小程度的英文單字題庫。
	{ prompt: "「蘋果」的英文是哪一個？", options: ["apple", "banana", "orange", "grape"], correctIndex: 0 },
	{ prompt: "哪個英文單字是「狗」？", options: ["cat", "bird", "dog", "fish"], correctIndex: 2 },
	{ prompt: "「開心」的英文是哪一個？", options: ["hungry", "happy", "sleepy", "angry"], correctIndex: 1 },
	{ prompt: "哪個英文單字代表「水」？", options: ["bread", "milk", "juice", "water"], correctIndex: 3 },
	{ prompt: "哪個單字是會喵喵叫的動物？", options: ["duck", "cow", "cat", "horse"], correctIndex: 2 },
	{ prompt: "「早安」的英文是哪一句？", options: ["Good night", "Good morning", "Thank you", "Goodbye"], correctIndex: 1 }
];

function preload() { // 在畫布建立前載入角色精靈圖。
	backgroundImage = loadImage("background/bg1.png"); // 載入背景圖片。
	stopSheet = loadImage("character/stop/stop.png"); // 載入停止動畫精靈圖。
	walkSheet = loadImage("character/walk/walk.png"); // 載入行走動畫精靈圖。
	runSheet = loadImage("character/run/run.png"); // 載入跑步動畫精靈圖。
	jumpSheet = loadImage("character/jump/jump.png"); // 載入跳躍動畫精靈圖。
	fallSheet = loadImage("character/fall/fall.png"); // 載入角色 1 倒地動畫精靈圖。
	pushSheet = loadImage("character/push/push.png"); // 載入發功動作精靈圖。
	effectSheet = loadImage("character/to/to.png"); // 載入發射特效精靈圖。
	character2StopSheet = loadImage("character2/stop/stop.png"); // 載入角色 2 停止動畫精靈圖。
	character2CorrectSheet = loadImage("character2/correct/correct.png"); // 載入角色 2 答對動畫精靈圖。
	character2IncorrectSheet = loadImage("character2/incorrect/incorrect.png"); // 載入角色 2 答錯動畫精靈圖。
	character2EffectSheet = loadImage("character2/effect/effect.png"); // 載入角色 2 攻擊特效。
} // 結束 preload 函式。

function setup() { // 設定畫布與角色初始位置。
	createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布。
	imageMode(CORNER); // 使用圖片左上角作為繪製座標基準。
	characterX = width * 4 / 5; // 將角色 1 初始位置設在畫布水平座標的五分之四處。
	characterStartX = characterX; // 記錄角色 1 的返回起點。
	character2X = width / 5; // 將角色 2 固定在畫布水平座標的五分之一處。
	characterY = height; // 將角色圖片底部對齊畫布底部。
} // 結束 setup 函式。

function getCharacterScale() { // 依畫布尺寸縮小角色，避免小螢幕上的角色被裁切。
	return min(CHARACTER_SCALE, width / 480, height / 420); // 保留一般螢幕的原始倍率並限制小畫布的角色尺寸。
} // 結束 getCharacterScale 函式。

function draw() { // 每一畫格更新背景、移動與角色動畫。
	image(backgroundImage, 0, 0, width, height); // 將背景圖片拉伸至填滿整個畫布。
	const movingRight = keyIsDown(RIGHT_ARROW); // 檢查目前是否按住鍵盤右方向鍵。
	const movingLeft = keyIsDown(LEFT_ARROW); // 檢查目前是否按住鍵盤左方向鍵。
	const movingUp = keyIsDown(UP_ARROW); // 檢查目前是否按住鍵盤向上方向鍵。
	const isRunning = keyIsDown(SHIFT) && (movingRight || movingLeft); // 同時按住 Shift 與任一方向鍵時啟動跑步。
	const currentSpeed = isRunning ? RUN_SPEED : MOVE_SPEED; // 依 Shift 狀態選擇移動速度。
	const fallElapsed = frameCount - fallAnimationStartFrame; // 計算角色 1 倒地動畫已播放的畫格數。
	const fallDuration = FALL_FRAME_COUNT * ANIMATION_FRAME_DELAY; // 設定倒地動畫播放一輪的總畫格數。
	if (isFalling) { // 倒地期間將角色平順移回起點。
		const fallProgress = constrain(fallElapsed / fallDuration, 0, 1); // 計算返回起點的動畫進度。
		characterX = lerp(fallStartX, characterStartX, fallProgress); // 讓角色隨倒地動畫退回起點。
	} // 結束倒地返回位置更新。
	let isWalking = false; // 預設角色目前沒有行走。
	if (!quizActive && !isFalling && movingUp && !upKeyWasDown && !isJumping) { // 題目或倒地時暫停操作，否則向上鍵剛按下且角色在地面時開始跳躍。
		isJumping = true; // 將角色狀態切換為跳躍中。
		jumpVelocity = JUMP_INITIAL_VELOCITY; // 設定跳躍開始時的向上速度。
	} // 結束跳躍觸發判斷。
	upKeyWasDown = movingUp; // 記錄向上鍵狀態以偵測下一次按下。
	if (isJumping) { // 角色在空中時更新跳躍位置與速度。
		characterYOffset += jumpVelocity; // 依目前垂直速度更新角色高度。
		jumpVelocity += JUMP_GRAVITY; // 加入重力使角色逐漸減速並下落。
		if (characterYOffset >= 0) { // 角色回到地面時結束跳躍。
			characterYOffset = 0; // 將角色垂直位置校正至地面。
			jumpVelocity = 0; // 清除垂直速度。
			isJumping = false; // 將角色狀態切回地面。
		} // 結束落地判斷。
	} // 結束跳躍物理更新。

	if (!quizActive && !isFalling && movingRight) { // 題目或倒地時暫停移動，否則按住右方向鍵時執行向右移動。
		characterX += currentSpeed; // 將角色依目前速度向右移動。
		facing = 1; // 設定角色面向右方。
		isWalking = true; // 切換為行走動畫。
	} else if (!quizActive && !isFalling && movingLeft) { // 題目或倒地時暫停移動，否則按住左方向鍵時執行向左移動。
		characterX -= currentSpeed; // 將角色依目前速度向左移動。
		facing = -1; // 設定角色面向左方。
		isWalking = true; // 切換為行走動畫。
	} // 結束方向鍵判斷。
	const usePushAnimation = pushAnimationTimer > 0; // 發功動畫只在有限播放時間內顯示。
	const pushAnimationFrame = floor((PUSH_FRAME_COUNT * ANIMATION_FRAME_DELAY * ATTACK_ANIMATION_CYCLES - pushAnimationTimer) / ANIMATION_FRAME_DELAY) % PUSH_FRAME_COUNT; // 計算兩輪發功動畫的目前影格。
	const frameCountForAnimation = isFalling ? FALL_FRAME_COUNT : usePushAnimation ? PUSH_FRAME_COUNT : isJumping ? JUMP_FRAME_COUNT : isRunning ? RUN_FRAME_COUNT : WALK_FRAME_COUNT; // 依倒地、發功、跳躍、跑步或行走狀態選擇動畫影格總數。
	const currentFrame = isFalling ? min(floor(fallElapsed / ANIMATION_FRAME_DELAY), FALL_FRAME_COUNT - 1) : usePushAnimation ? pushAnimationFrame : isJumping || isRunning || isWalking ? floor(frameCount / ANIMATION_FRAME_DELAY) % frameCountForAnimation : 0; // 倒地播放一輪，其他動作依狀態播放。
	if (usePushAnimation) { // 發功動畫播放期間倒數。
		pushAnimationTimer -= 1; // 播完兩輪後停止發功動畫。
	} // 結束發功動畫倒數。
	const sourceFrameWidth = isFalling ? fallSheet.width / FALL_FRAME_COUNT : usePushAnimation ? pushSheet.width / PUSH_FRAME_COUNT : isJumping ? jumpSheet.width / JUMP_FRAME_COUNT : isRunning ? runSheet.width / RUN_FRAME_COUNT : isWalking ? walkSheet.width / WALK_FRAME_COUNT : stopSheet.width / STOP_FRAME_COUNT; // 計算目前精靈圖每格的來源寬度。
	const sourceFrameHeight = isFalling ? fallSheet.height : usePushAnimation ? pushSheet.height : isJumping ? jumpSheet.height : isRunning ? runSheet.height : isWalking ? walkSheet.height : stopSheet.height; // 取得目前精靈圖每格的來源高度。
	const currentSheet = isFalling ? fallSheet : usePushAnimation ? pushSheet : isJumping ? jumpSheet : isRunning ? runSheet : isWalking ? walkSheet : stopSheet; // 選擇目前狀態要繪製的精靈圖。
	const frameSourceX = currentFrame * sourceFrameWidth; // 計算目前影格在精靈圖中的水平起點。
	const characterScale = getCharacterScale(); // 取得符合目前畫布的角色倍率。
	const displayFrameWidth = sourceFrameWidth * characterScale; // 計算放大後角色影格的顯示寬度。
	const displayFrameHeight = sourceFrameHeight * characterScale; // 計算放大後角色影格的顯示高度。

	const character2CurrentSheet = character2Action === "correct" ? character2CorrectSheet : character2Action === "incorrect" ? character2IncorrectSheet : character2StopSheet; // 取得角色 2 目前顯示的精靈圖。
	const character2CurrentFrameCount = character2Action === "stop" ? CHARACTER2_STOP_FRAME_COUNT : CHARACTER2_ACTION_FRAME_COUNT; // 取得角色 2 目前動畫的影格數。
	const character2DisplayFrameWidth = character2CurrentSheet.width / character2CurrentFrameCount * getCharacterScale(); // 計算角色 2 目前顯示影格的寬度。
	const minimumCharacterDistance = (displayFrameWidth + character2DisplayFrameWidth) / 2; // 依目前顯示影格計算兩角色不重疊的最小中心距離。
	const interactionDistance = minimumCharacterDistance + CHARACTER2_APPROACH_DISTANCE; // 角色影格邊緣幾乎相接時觸發答題。
	if (!isFalling) { // 倒地返回期間不套用碰撞限制，避免中斷返回動畫。
		characterX = constrain(characterX, character2X + minimumCharacterDistance, width - displayFrameWidth / 2); // 限制角色 1 不得穿過或重疊角色 2。
	} // 結束角色碰撞限制。
	const character2Distance = abs(characterX - character2X); // 計算兩名角色的水平距離。
	if (quizActive) { // 題目顯示後維持至學生完成作答。
		quizActive = true; // 避免角色動畫尺寸改變時題目閃爍。
	} else if (character2Distance <= interactionDistance) { // 角色 1 影格接近角色 2 時開始本次答題。
		if (!quizActive && !quizAnsweredForEncounter) { // 每次接近只顯示一次題目。
			currentQuizQuestion = QUIZ_QUESTIONS[floor(random(QUIZ_QUESTIONS.length))]; // 隨機抽出一題英文單字題。
			quizActive = true; // 顯示選擇題。
		} // 結束出題判斷。
	} else if (!isFalling) { // 角色 1 遠離角色 2 且倒地完成時重置互動狀態。
		quizActive = false; // 隱藏尚未作答的題目。
		quizAnsweredForEncounter = false; // 允許下次接近時再次出題。
	} // 結束接近距離判斷。
	if (character2Action !== "stop" && frameCount - character2ActionStartFrame >= CHARACTER2_ACTION_FRAME_COUNT * ANIMATION_FRAME_DELAY * CHARACTER2_ACTION_CYCLES) { // 角色 2 答題動畫播放完成後恢復停止狀態。
		character2Action = "stop"; // 切回停止動畫。
	} // 結束角色 2 動畫完成判斷。
	push(); // 暫存目前的繪圖座標與變形設定。
	translate(characterX, characterY + characterYOffset); // 將繪圖原點移至角色跳躍後的影格底部。
	if (facing === -1) { // 角色面向左方時執行水平翻轉。
		scale(-1, 1); // 將角色圖像水平鏡射以面向左方。
	} // 結束角色方向翻轉判斷。
	image(currentSheet, -displayFrameWidth / 2, -displayFrameHeight, displayFrameWidth, displayFrameHeight, frameSourceX, 0, sourceFrameWidth, sourceFrameHeight); // 裁切目前動畫影格、放大兩倍並將底部對齊畫布底部。
	pop(); // 還原繪圖座標與變形設定。
	if (isFalling && fallElapsed >= fallDuration) { // 倒地動畫播放完成時結束返回狀態。
		isFalling = false; // 恢復角色 1 的一般操作。
		characterX = characterStartX; // 確保角色 1 精確回到起點。
	} // 結束倒地動畫完成判斷。
	drawCharacter2(); // 繪製角色 2 的停止或答題動畫。
	if (character2Action === "incorrect" && character2Distance <= interactionDistance) { // 答錯且角色仍在附近時播放攻擊特效。
		drawCharacter2Attack(displayFrameHeight); // 將攻擊特效對準角色 1 的腰部。
	} // 結束角色 2 攻擊判斷。
	if (effectActive) { // 特效啟動時更新位置並繪製特效影格。
		const effectFrameWidth = effectSheet.width / EFFECT_FRAME_COUNT; // 計算特效精靈圖每格的來源寬度。
		const effectFrameHeight = effectSheet.height; // 取得特效精靈圖每格的來源高度。
		const effectDisplayWidth = effectFrameWidth * getCharacterScale(); // 計算配合角色倍率的特效影格顯示寬度。
		const effectDisplayHeight = effectFrameHeight * getCharacterScale(); // 計算配合角色倍率的特效影格顯示高度。
		const effectAnimationElapsed = frameCount - effectAnimationStartFrame; // 計算發射特效已播放的畫格數。
		if (effectAnimationElapsed >= EFFECT_FRAME_COUNT * ANIMATION_FRAME_DELAY * ATTACK_ANIMATION_CYCLES || effectX < -effectDisplayWidth / 2 || effectX > width + effectDisplayWidth / 2) { // 特效播放兩輪或飛出畫布時停止顯示。
			effectActive = false; // 關閉已飛出畫布的特效。
		} else { // 特效仍在畫布內時繪製目前影格。
			const effectFrame = floor(effectAnimationElapsed / ANIMATION_FRAME_DELAY) % EFFECT_FRAME_COUNT; // 計算兩輪播放中的特效影格。
			effectX += EFFECT_SPEED * effectFacing; // 讓特效沿著發射方向飛行。
			push(); // 暫存目前的繪圖座標與變形設定。
			translate(effectX, effectY); // 將繪圖原點移至特效中心。
			if (effectFacing === -1) { // 角色朝左發射時翻轉特效。
				scale(-1, 1); // 將特效水平鏡射至左方。
			} // 結束特效方向翻轉判斷。
			image(effectSheet, -effectDisplayWidth / 2, -effectDisplayHeight / 2, effectDisplayWidth, effectDisplayHeight, effectFrame * effectFrameWidth, 0, effectFrameWidth, effectFrameHeight); // 裁切並繪製放大後的特效影格。
			pop(); // 還原繪圖座標與變形設定。
		} // 結束特效繪製判斷。
	} // 結束特效更新與繪製。
	drawControls(); // 在畫布左上方繪製按鍵功能提示。
	if (quizActive) { // 題目啟動時顯示選擇題面板。
		drawQuizPanel(); // 繪製黃色透明題目框與可點選答案。
	} // 結束題目面板判斷。
} // 結束 draw 函式。

function drawCharacter2() { // 依互動狀態繪製角色 2 的動畫影格。
	const isAnswering = character2Action !== "stop"; // 判斷角色 2 是否正在播放答題結果動畫。
	const currentSheet = character2Action === "correct" ? character2CorrectSheet : character2Action === "incorrect" ? character2IncorrectSheet : character2StopSheet; // 選擇角色 2 目前使用的精靈圖。
	const animationFrameCount = isAnswering ? CHARACTER2_ACTION_FRAME_COUNT : CHARACTER2_STOP_FRAME_COUNT; // 取得目前動畫的影格數。
	const frameWidth = currentSheet.width / animationFrameCount; // 計算角色 2 單一影格的原始寬度。
	const frameHeight = currentSheet.height; // 取得角色 2 單一影格的原始高度。
	const actionElapsed = frameCount - character2ActionStartFrame; // 計算角色 2 答題動畫已播放的畫格數。
	const actionFrameLimit = animationFrameCount * CHARACTER2_ACTION_CYCLES; // 設定答題動畫最多播放四輪。
	const currentFrame = isAnswering ? min(floor(actionElapsed / ANIMATION_FRAME_DELAY), actionFrameLimit - 1) % animationFrameCount : 0; // 答題動畫播放兩輪，停止時固定顯示第一格。
	const characterScale = getCharacterScale(); // 取得符合目前畫布的角色倍率。
	const displayWidth = frameWidth * characterScale; // 依角色 1 的倍率放大角色 2 影格寬度。
	const displayHeight = frameHeight * characterScale; // 依角色 1 的倍率放大角色 2 影格高度。
	image(currentSheet, character2X - displayWidth / 2, height - displayHeight, displayWidth, displayHeight, currentFrame * frameWidth, 0, frameWidth, frameHeight); // 放大繪製角色 2 並將腳底對齊畫布底部。
} // 結束 drawCharacter2 函式。

function drawCharacter2Attack(characterHeight) { // 在角色 1 腰部繪製角色 2 的攻擊特效。
	if (!character2EffectSheet || !character2EffectSheet.width) { // 特效素材尚未載入時略過繪製。
		return; // 等待特效素材載入完成。
	} // 結束素材載入檢查。
	const frameWidth = character2EffectSheet.width / CHARACTER2_EFFECT_FRAME_COUNT; // 計算攻擊特效每格的來源寬度。
	const frameHeight = character2EffectSheet.height; // 取得攻擊特效每格的來源高度。
	const effectElapsed = frameCount - character2ActionStartFrame; // 計算角色 2 攻擊特效已播放的畫格數。
	if (effectElapsed >= CHARACTER2_EFFECT_FRAME_COUNT * ANIMATION_FRAME_DELAY * ATTACK_ANIMATION_CYCLES) { // 攻擊特效播放兩輪後停止。
		return; // 不再繪製已播完的攻擊特效。
	} // 結束攻擊特效播放時間判斷。
	const currentFrame = floor(effectElapsed / ANIMATION_FRAME_DELAY) % CHARACTER2_EFFECT_FRAME_COUNT; // 計算兩輪播放中的攻擊特效影格。
	const effectScale = getCharacterScale() / CHARACTER_SCALE; // 依角色縮放比例同步縮放攻擊特效。
	const displayWidth = frameWidth * effectScale; // 攻擊特效隨畫布尺寸調整寬度。
	const displayHeight = frameHeight * effectScale; // 攻擊特效隨畫布尺寸調整高度。
	const waistY = characterY + characterYOffset - characterHeight / 2; // 計算角色 1 目前姿勢的腰部高度。
	image(character2EffectSheet, characterX - displayWidth / 2, waistY - displayHeight / 2, displayWidth, displayHeight, currentFrame * frameWidth, 0, frameWidth, frameHeight); // 將攻擊特效中心對準角色 1 的腰部。
} // 結束 drawCharacter2Attack 函式。

function drawQuizPanel() { // 繪製畫布內的選擇題與答案按鈕。
	const panelWidth = min(480, width - 32); // 題目框依視窗寬度縮放並保留左右邊界。
	const panelHeight = min(220, height - 32); // 題目框依視窗高度縮放並保留上下邊界。
	const panelX = (width - panelWidth) / 2; // 將題目框水平置中。
	const panelY = (height - panelHeight) / 3; // 將題目框放在畫布上方且不超出視窗。
	const padding = 12; // 設定題目框內距。
	const gap = 8; // 設定答案按鈕間距。
	const buttonWidth = (panelWidth - padding * 2 - gap) / 2; // 計算兩欄答案按鈕寬度。
	const buttonHeight = (panelHeight - 70 - padding - gap) / 2; // 依面板高度計算兩列答案按鈕高度。
	push(); // 暫存目前的繪圖樣式。
	noStroke(); // 移除題目框與按鈕外框。
	fill(255, 230, 0, 204); // 設定黃色背景與百分之八十不透明度。
	rect(panelX, panelY, panelWidth, panelHeight, 8); // 繪製四分之一視窗大小的黃色題目框。
	fill(20); // 設定題目文字顏色。
	textAlign(LEFT, TOP); // 將題目文字靠左上對齊。
	textSize(min(20, panelWidth / 16)); // 依題目框寬度調整字體大小。
	text(currentQuizQuestion.prompt, panelX + padding, panelY + 10, panelWidth - padding * 2, 28); // 顯示英文單字題目。
	textAlign(CENTER, CENTER); // 將答案文字置中。
	textSize(min(18, buttonHeight * 0.55)); // 依答案按鈕高度調整字體大小。
	for (let optionIndex = 0; optionIndex < currentQuizQuestion.options.length; optionIndex += 1) { // 逐一繪製四個答案按鈕。
		const column = optionIndex % 2; // 計算答案按鈕所在欄位。
		const row = floor(optionIndex / 2); // 計算答案按鈕所在列。
		const buttonX = panelX + padding + column * (buttonWidth + gap); // 計算答案按鈕水平位置。
		const buttonY = panelY + 44 + row * (buttonHeight + gap); // 計算答案按鈕垂直位置。
		fill(255); // 設定答案按鈕底色。
		rect(buttonX, buttonY, buttonWidth, buttonHeight, 4); // 繪製答案按鈕。
		fill(20); // 設定答案文字顏色。
		text(currentQuizQuestion.options[optionIndex], buttonX, buttonY, buttonWidth, buttonHeight); // 顯示英文答案選項。
	} // 結束答案按鈕繪製迴圈。
	pop(); // 還原原本的繪圖樣式。
} // 結束 drawQuizPanel 函式。

function mousePressed() { // 處理學生點選選擇題答案。
	if (!quizActive) { // 題目未顯示時不處理點擊。
		return; // 結束滑鼠事件。
	} // 結束題目狀態檢查。
	const panelWidth = min(480, width - 32); // 計算符合視窗寬度的題目框寬度。
	const panelHeight = min(220, height - 32); // 計算符合視窗高度的題目框高度。
	const panelX = (width - panelWidth) / 2; // 計算題目框水平位置。
	const panelY = (height - panelHeight) / 3; // 將點擊範圍對齊題目框。
	const padding = 12; // 與題目面板使用相同內距。
	const gap = 8; // 與題目面板使用相同按鈕間距。
	const buttonWidth = (panelWidth - padding * 2 - gap) / 2; // 計算答案按鈕寬度。
	const buttonHeight = (panelHeight - 70 - padding - gap) / 2; // 依面板高度計算答案按鈕高度。
	for (let optionIndex = 0; optionIndex < currentQuizQuestion.options.length; optionIndex += 1) { // 逐一檢查點擊位置是否落在答案按鈕內。
		const column = optionIndex % 2; // 計算答案按鈕所在欄位。
		const row = floor(optionIndex / 2); // 計算答案按鈕所在列。
		const buttonX = panelX + padding + column * (buttonWidth + gap); // 計算答案按鈕水平位置。
		const buttonY = panelY + 44 + row * (buttonHeight + gap); // 計算答案按鈕垂直位置。
		if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight) { // 點擊答案按鈕時提交答案。
			quizActive = false; // 隱藏題目框。
			quizAnsweredForEncounter = true; // 標記本次接近已完成答題。
			character2Action = optionIndex === currentQuizQuestion.correctIndex ? "correct" : "incorrect"; // 依答案設定角色 2 的答對或答錯動畫。
			character2ActionStartFrame = frameCount; // 從答題當下開始計算動畫與攻擊特效播放時間。
			if (character2Action === "incorrect") { // 答錯時讓角色 1 倒地並返回起點。
				isFalling = true; // 啟動角色 1 倒地狀態。
				fallStartX = characterX; // 記錄倒地動畫開始時的位置。
				fallAnimationStartFrame = frameCount; // 從答錯當下開始播放倒地動畫。
				isJumping = false; // 中止答錯前正在進行的跳躍。
				characterYOffset = 0; // 將倒地動畫固定在地面高度。
				jumpVelocity = 0; // 清除跳躍速度。
				pushAnimationTimer = 0; // 中止角色 1 尚未播放完的發功動畫。
				isPushing = false; // 清除發功按住狀態。
				effectActive = false; // 清除角色 1 尚未飛完的特效。
			} // 結束答錯倒地處理。
			return; // 一次點擊只提交一個答案。
		} // 結束答案按鈕命中判斷。
	} // 結束答案檢查迴圈。
} // 結束 mousePressed 函式。

function keyPressed() { // 使用鍵盤事件捕捉空白鍵按下，避免短按被漏掉。
	if (keyCode === 32 && !isPushing) { // 空白鍵剛按下時啟動發功並發射特效。
		isPushing = true; // 切換至發功動畫。
		pushAnimationTimer = PUSH_FRAME_COUNT * ANIMATION_FRAME_DELAY * ATTACK_ANIMATION_CYCLES; // 發功動畫固定播放兩輪。
		effectActive = true; // 啟動飛行中的特效。
		effectAnimationStartFrame = frameCount; // 從發射當下開始計算特效播放時間。
		effectFacing = facing; // 記錄發射當下角色面向的方向。
		effectX = characterX + facing * (pushSheet.width / PUSH_FRAME_COUNT * getCharacterScale() * 0.42); // 將特效起點放在角色出拳方向前方。
		effectY = characterY + characterYOffset - pushSheet.height * getCharacterScale() * 0.62; // 將特效起點對準角色出拳高度。
	} // 結束空白鍵判斷。
} // 結束 keyPressed 函式。

function keyReleased() { // 使用鍵盤事件偵測空白鍵放開。
	if (keyCode === 32) { // 空白鍵放開時結束發功動作。
		isPushing = false; // 讓角色切回其他符合目前輸入的動畫。
	} // 結束空白鍵放開判斷。
} // 結束 keyReleased 函式。

function drawControls() { // 繪製鍵盤操作說明。
	const panelWidth = min(600, width - 32); // 讓操作提示置中並保留窄螢幕邊界。
	const compactLayout = width < 560; // 窄螢幕改用兩列提示文字。
	const panelHeight = compactLayout ? 68 : 44; // 依文字列數設定提示面板高度。
	push(); // 暫存目前的繪圖樣式。
	noStroke(); // 移除提示背景的外框。
	fill(0, 0, 0, 170); // 設定半透明深色提示背景。
	rect((width - panelWidth) / 2, 12, panelWidth, panelHeight, 6); // 在畫布上方中央繪製精簡提示背景。
	fill(255); // 將提示文字設為白色。
	textSize(compactLayout ? 14 : 16); // 窄螢幕使用較小字級以避免文字溢出。
	textAlign(CENTER, CENTER); // 將提示文字置中對齊面板。
	if (compactLayout) { // 窄螢幕分成兩列顯示操作提示。
		text("↑ 跳躍　← / → 移動\nShift + ← / → 跑步　Space 發功", width / 2, 12 + panelHeight / 2); // 顯示窄螢幕操作提示。
	} else { // 寬螢幕以單列顯示操作提示。
		text("↑ 跳躍　← / → 移動　Shift + ← / → 跑步　Space 發功", width / 2, 12 + panelHeight / 2); // 顯示寬螢幕操作提示。
	} // 結束提示版面判斷。
	pop(); // 還原原本的繪圖樣式。
} // 結束 drawControls 函式。

function windowResized() { // 瀏覽器視窗尺寸改變時重新調整畫布。
	resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗大小。
	characterStartX = width * 4 / 5; // 視窗尺寸改變後更新角色 1 的返回起點。
	characterX = characterStartX; // 將角色 1 移至新畫布的起始位置。
	fallStartX = characterStartX; // 同步更新倒地返回動畫的起始位置。
	isFalling = false; // 視窗尺寸改變時結束倒地動畫。
	character2X = width / 5; // 視窗尺寸改變後將角色 2 維持在畫布水平座標的五分之一處。
	characterY = height; // 視窗尺寸改變後仍將角色圖片底部對齊畫布底部。
} // 結束 windowResized 函式。
