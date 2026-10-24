"""Use source-checked publisher-hosted media without copying it to this site."""
from pathlib import Path
from html import escape
import json,re

def apply(out):
 registry=Path(__file__).with_name('official-remote-media.json')
 records=json.loads(registry.read_text()) if registry.exists() else {}
 # Source-checked asset repairs. Keep the registry's remaining records untouched.
 records.get("jio-google-ai-pro-18-months-free-offer-eligibility-deadline-guide", {}).update(logo_url="https://myjiostatic.cdn.jio.com/jiocom/static/images/jio10-mobile.svg")
 records.get("drawio-diagrams-net-free-diagram-maker-no-signup-privacy-guide", {}).update(logo_url="https://www.drawio.com/img/logo.svg", logo_width=48, logo_height=48)
 records.get("syncthing-keep-folders-in-sync-between-your-devices-open-source-guide", {}).update(logo_url="https://syncthing.net/img/logo-horizontal.svg", logo_width=300, logo_height=82)
 records.get("antennapod-free-ad-free-podcast-player-android-guide", {}).update(logo_url="https://antennapod.org/assets/branding/logos/logo-icon.png", logo_width=512, logo_height=512)
 records.get("gparted-free-disk-partition-editor-resize-partitions-bootable-usb-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("darebee-free-ad-free-home-workouts-no-signup-2821-guide", {}).update(logo_url="https://darebee.com/images/content/press/darebee-logo.png?v=1784360397", logo_width=2579, logo_height=1029)
 records.get("jet-programme-2027-alt-teach-english-japan-india-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("fortinet-pause-free-scam-awareness-canada-india-guide", {}).update(logo_url="https://www.fortinet.com/content/dam/fortinet/images/favicon/apple-touch-icon.png", logo_width=180, logo_height=180)
 records.setdefault("musicbrainz-picard-free-music-tagger-organize-mp3-flac-guide", {}).update(logo_url="https://picard.musicbrainz.org/static/img/picard-icon-large.svg?v=dd59b67b", logo_width=154, logo_height=154, poster_url=None, under_chip_only=True, source_page="https://picard.musicbrainz.org/")
 records.get("digikam-free-photo-manager-organize-tag-search-photos-guide", {}).update(logo_url="https://www.digikam.org/img/digikam_oxygen.svg", logo_width=128, logo_height=128, poster_url=None, under_chip_only=True)
 records.setdefault("eartrumpet-free-volume-mixer-windows-microsoft-store-guide", {}).update(logo_url="https://raw.githubusercontent.com/File-New-Project/EarTrumpet/master/EarTrumpet/Assets/Icon-Light.ico", logo_width=256, logo_height=256, poster_url=None, under_chip_only=True)
 records.setdefault("fxsound-free-open-source-sound-booster-equalizer-windows-guide", {}).update(logo_url="https://raw.githubusercontent.com/fxsound2/fxsound-app/main/fxsound/Images/FxSound%20Black%20Bars.svg", logo_width=256, logo_height=256, poster_url=None, under_chip_only=True)
 records.setdefault("ninite-install-many-windows-programs-at-once-home-use-guide", {}).update(logo_url="https://ninite.com/static/img/brand-8a2e7c6ad769d6bc457c5c2b1a9743e8.png", logo_width=312, logo_height=116, poster_url=None, under_chip_only=True)
 records.get("sharex-free-screenshot-screen-recorder-windows-no-ads-guide", {}).update(logo_url="https://raw.githubusercontent.com/ShareX/ShareX/master/ShareX.HelpersLib/Resources/ShareX_Logo.png", logo_width=256, logo_height=256)
 records.get("jasp-free-statistics-software-no-coding-windows-mac-linux-guide", {}).update(logo_width=300, logo_height=300, poster_url=None, under_chip_only=True)
 records.get("thonny-python-ide-beginners-step-by-step-debugger-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("foobar2000-free-music-player-windows-mac-android-ios-guide", {}).update(logo_width=324, logo_height=49, poster_url=None, under_chip_only=True)
 records.setdefault("auto-dark-mode-free-automatic-windows-theme-switcher-guide", {}).update(logo_url="https://raw.githubusercontent.com/AutoDarkMode/Windows-Auto-Night-Mode/master/adm_new.ico", logo_width=256, logo_height=256, poster_url=None, under_chip_only=True)
 records.get("bhashini-indian-language-translation-guide", {}).update(logo_url="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/50/61/e7/5061e73a-ee46-7bee-cb27-a27b5a85cc36/Placeholder.mill/400x400Icon.ApSiOS01-75.webp", logo_width=400, logo_height=400)
 records.get("common-fellowships-portal-phd-postdoc-fellowships-eligibility-calculator-guide", {}).update(logo_url="https://www.fellowships.gov.in/images/mst-logo.png", logo_width=800, logo_height=447, poster_url=None, under_chip_only=False, width=800, height=447, background="#fff", display_max_width="320px")
 records.get("mediainfo-free-video-audio-file-details-checker-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("fontforge-free-font-editor-design-typefaces-windows-mac-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("winscp-free-ftp-sftp-file-transfer-client-windows-guide", {}).update(logo_url="https://winscp-static-746341.c.cdn77.org/assets/images/logos/logo.png?v=146", logo_width=55, logo_height=54)
 records.get("vlc-media-player-free-no-ads-videolan-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("obs-studio-free-open-source-screen-recording-live-streaming-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("krita-free-digital-painting-drawing-animation-software-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("blender-free-open-source-3d-software-download-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("audacity-free-ai-plugins-noise-removal-transcription-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("inkscape-free-vector-graphics-editor-logos-posters-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("handbrake-free-video-converter-windows-mac-linux-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("kdenlive-free-open-source-video-editor-windows-mac-linux-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("gimp-free-open-source-image-editor-windows-mac-linux-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("scribus-free-desktop-publishing-newsletter-brochure-print-pdf-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("thunderbird-free-email-app-windows-mac-linux-android-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("libreoffice-free-office-suite-no-forced-ai-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("qgis-free-mapping-gis-software-windows-mac-linux-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("our-world-in-data-free-charts-data-explainers-reuse-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("pencil2d-free-open-source-hand-drawn-2d-animation-software-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("localsend-free-share-files-nearby-devices-wifi-no-cloud-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("lmms-free-open-source-music-making-software-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("naps2-free-open-source-document-scanner-pdf-windows-mac-linux-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("flow-launcher-free-open-source-windows-app-and-file-search-launcher-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("freecad-free-3d-parametric-modeler-design-real-objects-3d-print-guide", {}).update(logo_url="https://www.freecad.org/svg/logo-freecad.svg", poster_url=None, under_chip_only=True)
 records.get("microsoft-powertoys-free-windows-utilities-text-extractor-image-resizer-guide", {}).update(logo_url="https://raw.githubusercontent.com/microsoft/PowerToys/main/doc/images/icons/PowerToys%20icon/PNG/PowerToysAppList.targetsize-256.png", logo_width=256, logo_height=256, poster_url="https://raw.githubusercontent.com/microsoft/PowerToys/main/doc/images/settingsv2/file-explorer.png", width=1092, height=893)
 records.get("quicklook-free-windows-file-preview-press-space-explorer-guide", {}).update(poster_url="https://raw.githubusercontent.com/QL-Win/QuickLook/master/Build/Assets/Branding/01.png", width=1165, height=633)
 records.get("loop-habit-tracker-free-ad-free-android-habit-app-guide", {}).update(logo_url="https://raw.githubusercontent.com/iSoron/uhabits/dev/uhabits-android/src/main/play/listings/en-US/graphics/icon/1.png", logo_width=512, logo_height=512, poster_url="https://raw.githubusercontent.com/iSoron/uhabits/dev/screenshots/1.png", width=1080, height=1920)
 records.get("f-droid-free-open-source-android-app-store-no-ads-guide", {}).update(logo_url="https://gitlab.com/uploads/-/system/project/avatar/1010252/fdroid-135_2x.png?v=1792159019", logo_width=270, logo_height=270, poster_url="https://raw.githubusercontent.com/f-droid/fdroidclient/master/src/full/fastlane/metadata/android/en-US/images/phoneScreenshots/01-latest.png", width=1080, height=2400)
 records.get("fossify-open-source-ad-free-android-apps-gallery-calendar-guide", {}).update(poster_url="https://raw.githubusercontent.com/FossifyOrg/Gallery/main/fastlane/metadata/android/en-US/images/phoneScreenshots/1_en-US.png", width=1080, height=1920)
 records.get("calibre-free-ebook-manager-converter-reader-guide", {}).update(poster_url="https://raw.githubusercontent.com/kovidgoyal/calibre/master/manual/images/edit-book.png", width=1411, height=844)
 records.setdefault("anki-free-flashcards-spaced-repetition-app-windows-mac-android-guide", {}).update(logo_url="https://raw.githubusercontent.com/ankitects/anki/main/docs-site/media/anki-logo.svg", logo_width=288, logo_height=288, poster_url=None, under_chip_only=True)
 records.get("scrcpy-free-open-source-show-android-screen-on-pc-usb-guide", {}).update(logo_url="https://raw.githubusercontent.com/Genymobile/scrcpy/master/app/data/scrcpy.svg", logo_width=48, logo_height=48, under_chip_only=True)
 records.get("xournal-plus-plus-open-source-handwritten-notes-guide", {}).update(logo_url="https://raw.githubusercontent.com/xournalpp/xournalpp/master/ui/pixmaps/com.github.xournalpp.xournalpp.svg", logo_width=128, logo_height=128, under_chip_only=True)
 records.get("voicestudio-free-open-source-local-voice-cloning-dubbing-app-guide", {}).update(poster_url="https://raw.githubusercontent.com/debpalash/VoiceStudio/main/docs/media/electron/voice-cloning.png", width=1440, height=960)
 records.get("super-productivity-free-open-source-todo-time-tracker-guide", {}).update(logo_url="https://raw.githubusercontent.com/super-productivity/super-productivity/master/src/assets/icons/icon-192x192.png", logo_width=192, logo_height=192)
 records.get("gcompris-free-educational-games-kids-2-to-10-windows-android-guide", {}).update(logo_url="https://gcompris.net/favicon.png", logo_width=32, logo_height=32)
 # meta.com/favicon.ico loads as a zero-width image in browsers; drop the broken 32px logo (24 Oct 2026 recheck).
 # appinventor.mit.edu/favicon.ico renders as a broken image; no verified official logo asset, so no logo (24 Oct 2026 recheck).
 records.get("mit-app-inventor-free-build-android-apps-blocks-browser-guide", {}).update(logo_url="")
 records.get("meta-ai-whatsapp-how-to-use-india", {}).update(logo_url="")
 records.get("meta-enterprise-platform-muse-business-ai-launch", {}).update(logo_url="")
 records.get("meta-muse-ai-glasses-access-pricing-privacy-guide", {}).update(logo_url="")
 records.get("meta-horizon-create-studio-early-access-game-building-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("ray-ban-meta-audio-india-coming-soon-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("ray-ban-meta-gen-3-india-price-privacy-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("pinta-free-open-source-simple-image-editor-windows-mac-linux-guide", {}).update(logo_url="https://pinta-project.com/img/pinta-og.png", logo_width=1200, logo_height=1200)
 records.get("ventoy-free-multiboot-usb-drive-iso-files-windows-linux-guide", {}).update(logo_url="https://www.ventoy.net/static/img/ventoy.png", logo_width=72, logo_height=72)
 records.get("freefilesync-free-folder-backup-sync-software-personal-use-guide", {}).update(logo_url="https://freefilesync.org/images/FreeFileSync.png", logo_width=256, logo_height=256)
 records.get("everything-voidtools-free-instant-file-search-windows-guide", {}).update(logo_url="https://www.voidtools.com/voidtools9.png", logo_width=176, logo_height=110)
 records.setdefault("cohesity-agent-resilience-aws-bedrock-recovery-limits-guide", {}).update(poster_url="https://www.cohesity.com/platform/agent-resilience/_jcr_content/root/container/heroes/heroes-two-column-image.coreimg.svg/1790014105490/cs-13158-agent-resilience-platform-page-illustration.svg", source_page="https://www.cohesity.com/platform/agent-resilience/", width=240, height=150)
 records.get("constructor-ai-online-paid-access-print-safety-guide", {}).update(poster_url="https://constructorai.eu/assets/app-text-zu-bauteil.jpg", source_page="https://constructorai.eu/online", width=1200, height=563)
 records.setdefault("metrolist-youtube-music-client", {}).update(logo_url="https://raw.githubusercontent.com/MetrolistGroup/Metrolist/v13.7.0/fastlane/metadata/android/en-US/images/icon.png", logo_width=512, logo_height=512, poster_url="https://raw.githubusercontent.com/MetrolistGroup/Metrolist/v13.7.0/fastlane/metadata/android/en-US/images/screenshots/screenshot_1.png", source_page="https://github.com/MetrolistGroup/Metrolist", width=719, height=1598)
 records.pop("cyber-hygiene-quiz-ncsam-2026-isea-cert-in-guide", None) # National-emblem artwork prohibited by owner.
 records.get("cua-spaces-ai-desktop-sandbox-guide", {}).update(poster_url="https://cua.ai/_spaces/img/og/spaces-card.jpg", source_page="https://cua.ai/pricing", width=1200, height=630)
 records.pop('cyber-safe-yuva-reel-contest-2026-i4c-mha-goodies-ends-15-november-guide', None) # Owner excludes national-emblem media.
 records.pop('cyber-security-awareness-quiz-2026-dsci-mygov-4000-winners-guide', None) # Owner excludes national-emblem media.
 records.pop('common-fellowships-portal-phd-postdoc-fellowships-eligibility-calculator-guide', None) # MST logo carries the national emblem; text fallback.
 records.get("dazzle-photo-ai-assistant-india-privacy-guide", {}).update(poster_url="https://dazzle.ai/wp-content/uploads/2026/09/dazzle-feature-get-it-done.webp", source_page="https://dazzle.ai/dazzle/", width=883, height=1690)
 records.get("deepseek-harness-plugins-preview-safety-cost-guide", {}).update(poster_url="https://www.deepseek.com/harness/images/feat-plugins-en.webp", source_page="https://www.deepseek.com/en/harness/", width=2590, height=1619)
 records.get("descript-ai-video-audio-editing-guide", {}).update(poster_url="https://mintcdn.com/descript-5bf56f3f/3j47b3XLm5VXH3bx/images/external/descript-39190246200077-fb3318cc6b.jpg?fit=max&auto=format&n=3j47b3XLm5VXH3bx&q=85&s=ca56cbc2369a91e853794a18dbd6ff94", source_page="https://help.descript.com/getting-started/get-started-with-descript", width=2000, height=1164)
 records.get("digilocker-digital-documents-guide", {}).update(poster_url=None, under_chip_only=True)
 records.setdefault("digup-free-mac-app-search-files-by-meaning-on-device-guide", {}).update(logo_url="https://github.com/ARahim3/DigUp/raw/main/docs/logo.png", logo_width=256, logo_height=256, poster_url="https://raw.githubusercontent.com/ARahim3/DigUp/main/docs/demo.gif", source_page="https://github.com/ARahim3/DigUp", width=1200, height=800)
 records.setdefault("double-commander-free-open-source-two-panel-file-manager-windows-linux-mac-guide", {}).update(logo_url="https://raw.githubusercontent.com/doublecmd/doublecmd/master/pixmaps/mainicon/dc_256.svg", logo_width=256, logo_height=256, poster_url="https://doublecmd.sourceforge.io/gallery/images/MainWindow.png", source_page="https://doublecmd.sourceforge.io/gallery", width=1296, height=978, credit_notice="Official gallery screenshot shows Double Commander 1.1.9-332, not current 1.2.9. Hosted by publisher. {url}. Independent guide, not affiliated or sponsored.")
 records.setdefault("gnucash-free-money-tracking-accounting-software-guide", {}).update(poster_url="https://gnucash.org/images/features/feature_register.png", source_page="https://gnucash.org/features.phtml", width=400, height=309, credit_notice="Official features-page register illustration, historical example, not a current-version or India-tax demonstration. Hosted by publisher. {url}. Independent guide, not affiliated or sponsored.")
 records.setdefault("languagetool-free-ai-grammar-checker-web-editor-2000-characters-guide", {}).update(logo_url="https://languagetool.org/images/favicons/android-chrome-192x192.png", logo_width=192, logo_height=192, poster_url=None, under_chip_only=True, source_page="https://languagetool.org/", width=192, height=192)
 records.setdefault("ugc-net-december-2026-apply-by-28-october-guide", {}).update(logo_url="https://cdnbbsr.s3waas.gov.in/s301eee509ee2f68dc6014898c309e86bf/uploads/2022/04/2022040617.png", logo_width=300, logo_height=67, poster_url=None, under_chip_only=True, source_page="https://ugcnet.nta.nic.in/")
 records.setdefault("csir-ugc-net-december-2026-apply-by-5-november-guide", {}).update(logo_url="https://cdnbbsr.s3waas.gov.in/s3efdf562ce2fb0ad460fd8e9d33e57f57/uploads/2022/04/2022041140.png", logo_width=300, logo_height=67, poster_url=None, under_chip_only=True, source_page="https://csirnet.nta.nic.in/")
 records.get("indus-by-sarvam-indian-language-ai-chat-app-free-plan-guide", {}).update(under_chip_only=True, logo_url="https://assets.sarvam.ai/assets/brand/logos/sarvam-wordmark-black.svg", logo_width=190, logo_height=38)
 records.get("ikea-kreativ-ai-room-design-app-india-free-guide", {}).update(poster_url="https://www.ikea.com/images/a-person-holds-up-a-mobile-phone-and-uses-the-kreativ-app-wh-8da69dba2ef1085b30669dc36d70b5a5.jpg", source_page="https://www.ikea.com/in/en/planners/design-your-dream-home-pub66945dd9/", width=1600, height=900)
 records.get("irisgo-free-beta-ai-learns-tasks-by-watching-windows-mac-privacy-guide", {}).update(logo_url="https://irisgo.ai/images/irisgo-logo.png", logo_width=6720, logo_height=1701)
 records.get("jago-grahak-jago-quiz-2026-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.setdefault("janaushadhi-generic-medicines-kendra-guide", {}).update(logo_url="https://janaushadhi.gov.in/img/bhartiya_janaushadhi_priyojna_2.svg", poster_url=None, under_chip_only=True, source_page="https://janaushadhi.gov.in/")
 records.get("jansamarth-government-linked-loans-eligibility-guide", {}).update(poster_url=None, under_chip_only=True)
 records.setdefault("jeevan-pramaan-digital-life-certificate-face-auth-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True, source_page="https://jeevanpramaan.gov.in/v2.0/")
 records.get("jio-canva-pro-12-months-free-offer-recharge-eligibility-guide", {}).update(logo_url="https://myjiostatic.cdn.jio.com/jiocom/static/images/jio10-mobile.svg")
 records.get("kerala-edistrict-certificates-online", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("kernelai-free-offline-ai-phone-app-android-ios-no-account-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("kickbacks-ai-ads-in-claude-code-codex-what-to-know-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.setdefault("kerala-whatsapp-services-reported-aicon-test-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.setdefault("kerala-waqf-board-loan-scholarship-2026-rs-5000-monthly-professional-students-apply-by-31-october-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("kerala-psc-130-150-2026-october7-deadline-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("kerala-oec-post-matric-scholarship-outside-state", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("kerala-minority-itc-fee-reimbursement-2026-27-rs-10000-20000-apply-by-20-november-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("kerala-margadeepam-scholarship-2026-27-class-1-8-minority-rs-1500-apply-by-31-october-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("kerala-minority-ca-cma-cs-scholarship-2026-27-rs-15000-apply-by-25-november-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("kolibri-free-offline-learning-platform-lessons-videos-android-guide", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("knowt-free-ai-flashcards-india", {}).update(logo_url="", poster_url=None, under_chip_only=True)
 records.get("kong-portal-mcp-oauth-read-write-access-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("kontext-agent-security-free-policy-limits-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("krisp-noise-cancellation-trial-meeting-notes-guide", {}).update(credit_notice="Official publisher product illustration from its 2025 image path, not a current UI, storage-quota or India-language test. Hosted by publisher. {url}. Independent guide, not affiliated or sponsored.")
 records.get("krokiet-czkawka-free-duplicate-file-finder-clean-up-photos-folders-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("kscste-science-literature-awards-2025-rs-50000-malayalam-science-books-apply-by-10-november-guide", {}).update(credit_notice="Official publisher general science illustration, not an award notice or a result. Hosted by publisher. {url}. Independent guide, not affiliated or sponsored.")
 records.get("kstars-free-planetarium-software-windows-mac-linux-guide", {}).update(logo_url="", credit_notice="Official publisher KStars sky-view screenshot, not a current AI/MCP/hardware test. Hosted by publisher. {url}. Independent guide, not affiliated or sponsored.")
 records.get("langsmith-engine-v2-redteam-fine-tuning-access-guide", {}).update(credit_notice="Official LangSmith Observability promotional illustration, not an Engine red-team report or tested fix. Hosted by publisher. {url}. Independent guide, not affiliated or sponsored.")
 records.get("lemonslice-cwm1-interactive-avatar-pricing-free-paid-guide", {}).update(credit_notice="Official publisher avatar promotional illustration, not a verified CWM-1 free-plan or live-session demonstration. Hosted by publisher. {url}. Independent guide, not affiliated or sponsored.")
 records.get("lenskart-face-analysis-3d-try-on-ai-glasses-selfie-privacy-guide", {}).update(poster_url=None, under_chip_only=True)
 records.get("lg-thinq-claw-beta-india-availability-guide", {}).update(poster_url="https://www.lg.com/content/dam/channel/wcms/global/newsroom/lg-story/beyond-news/innovation-in-tune-with-you-how-lg-orchestrated-the-ai-home-experience-at-ifa-2026/press-setting-image-desktop-tablet-ifasketch-1440-3.png", width=1440, height=969, source_page="https://www.lg.com/global/newsroom/lg-story/beyond-news/innovation-in-tune-with-you-how-lg-orchestrated-the-ai-home-experience-at-ifa-2026/", credit_notice="Official LG photograph of its IFA 2026 AI Home exhibit, not a current India-access or appliance-control test. Hosted by publisher. {url}. Independent guide, not affiliated or sponsored.")
 records.get("librecad-free-open-source-2d-cad-drawing-software-windows-mac-linux-guide", {}).update(poster_url="https://librecad.org/img/welcome.png", width=568, height=396, credit_notice="Official publisher historical homepage screenshot, not our current-version or import/export test. Hosted by publisher. {url}. Independent guide, not affiliated or sponsored.")
 # Official hosts that failed repeated real article loads stay text-only.
 unavailable=['cadence-chipstack-rtl-agent-early-access-limits-guide', 'glasp-free-highlights-youtube-summaries-public-by-default-guide', 'pm-svanidhi-street-vendor-loan-guide', 'aadhaar-biometric-lock-unlock', 'pm-mudra-loan-shishu-tarun-plus-guide', 'national-frontier-ai-compute-fund-proposal-status-guide', 'digital-arrest-scam-india-report-guide', 'online-fraud-1930-first-hour-reporting-guide', 'abha-health-id-create-free', 'sanchar-saathi-check-sim-block-lost-phone', 'hdfc-bank-eva-ai-chatbot-free-banking-questions-guide', 'pm-vishwakarma-artisan-scheme-guide', 'pm-internship-scheme-paid-internships-guide', 'myupi-npci-fimi-support-safety-controls-guide', 'rbi-ombudsman-complaint-guide-2026', 'adobe-premiere-mobile-free-video-editor-guide', 'youth-entrepreneurs-challenge-2027-vbyld-age-18-35-cash-prizes-up-to-rs-1-5-lakh-guide', 'apprenticeship-india-registration-stipend-guide', 'esanjeevani-free-online-doctor-kerala-guide', 'prismor-ai-agent-security-free-runtime-policy-guide', 'undp-internships-how-they-work-how-to-apply-guide', 'adobe-scan-free-ai-document-scanner-guide', 'adobe-gemini-claude-creative-acrobat-access-guide']
 records={s:x for s,x in records.items() if s not in unavailable}
 applied={}
 # Articles without a usable official hotlink are intentionally text-only.
 for page in (out/'posts').glob('*.html'):
  slug=page.stem;text=page.read_text()
  text=re.sub(r'<img\b[^>]*class=["\x27][^"\x27]*\btool-logo\b[^"\x27]*["\x27][^>]*>','',text,flags=re.I)
  text=re.sub(r'<figure\b[^>]*>.*?</figure>',lambda m:'' if re.search(r'<img[^>]*src=["\x27](?:data:image|(?:\.\./)?assets/og/)',m[0],re.I) else m[0],text,flags=re.S)
  text=re.sub(r'<img\b[^>]*>',lambda m:'' if re.search(r'src=["\x27](?:data:image|(?:\.\./)?assets/og/|https://aicon-hub.github.io/assets/og/)',m[0],re.I) and not re.search(r'class=["\x27][^"\x27]*\bcover\b',m[0],re.I) else m[0],text)
  if slug not in records:
   text=re.sub(r'<img\b[^>]*class=["\x27][^"\x27]*\bcover\b[^"\x27]*["\x27][^>]*>','',text,flags=re.I)
   text=re.sub(r'<meta\b(?=[^>]*(?:name|property)=["\x27](?:og:image(?::(?:width|height))?|twitter:image)["\x27])[^>]*>','',text,flags=re.I)
   text=re.sub(r'("image"\s*:\s*)"https://aicon-hub.github.io/assets/og/[^"<>]+"\s*,?', '',text)
   text=re.sub(r'<p\b[^>]*class=["\x27][^"\x27]*media-credit[^"\x27]*["\x27][^>]*>.*?</p>','',text,flags=re.S)
   text=re.sub(r'(<meta[^>]*(?:name|property)=["\x27]twitter:card["\x27][^>]*content=["\x27])summary_large_image',r'\1summary',text)
  page.write_text(text)
 for slug,x in records.items():
  p=out/'posts'/(slug+'.html')
  if not p.exists():continue
  source=x.get('source_page','');text=p.read_text();old=[]
  lurl=x.get('logo_url','')
  if lurl.startswith('https://'):
   lw=x.get('logo_width');lh=x.get('logo_height')
   dim=(' width="'+str(lw)+'" height="'+str(lh)+'"') if lw and lh else ''
   limg='<img class="tool-logo" src="'+escape(lurl,quote=True)+'" alt="Official publisher logo; independent guide, not sponsored" referrerpolicy="no-referrer"'+dim+' decoding="async"/>'
   cm=re.search(r'<span\b[^>]*class=["\x27][^"\x27]*\bchip\b[^"\x27]*["\x27][^>]*>.*?</span>',text,re.I|re.S)
   if cm:text=text[:cm.end()]+limg+text[cm.end():]
   else:text=re.sub(r'<h1\b',lambda _:limg+'<h1',text,count=1,flags=re.I)
  if x.get('under_chip_only'):
   # Remove only obsolete locally generated covers, never authored tutorial media.
   text=re.sub(r'<img\b[^>]*>',lambda m:'' if re.search(r'class=["\x27][^"\x27]*\bcover\b',m[0],re.I) and re.search(r'src=["\x27](?:\.\./)?assets/og/',m[0],re.I) else m[0],text,flags=re.I)
   p.write_text(text);continue
  u=x.get('poster_url') or x.get('logo_url')
  if not u or not u.startswith('https://'):continue
  for m in re.finditer(r'<img\b[^>]*class=["\x27][^"\x27]*\bcover\b[^"\x27]*["\x27][^>]*>',text,re.I):
   sm=re.search(r'src=["\x27]([^"\x27]+)',m[0]);old.extend([sm[1]] if sm else [])
  logo=not x.get('poster_url');w=x.get('width',1200);h=x.get('height',630)
  label='Official publisher logo' if logo else 'Official publisher artwork'
  img='<img class="cover official-remote-media" src="'+escape(u,quote=True)+'" alt="'+label+'; independent guide, not sponsored" referrerpolicy="no-referrer" width="'+str(w)+'" height="'+str(h)+'" style="object-fit:contain;width:100%;max-width:'+(str(x.get('display_max_width','240px')) if logo else '100%')+';height:auto;max-height:460px;border-radius:0;background:'+escape(x.get('background','#fff' if logo else 'transparent'),quote=True)+'"/>'
  if re.search(r'<img\b[^>]*class=["\x27][^"\x27]*\bcover\b',text,re.I):text=re.sub(r'<img\b[^>]*class=["\x27][^"\x27]*\bcover\b[^"\x27]*["\x27][^>]*>',lambda _:img,text,count=1,flags=re.I)
  else:text=text.replace('</h1>','</h1>'+img,1)
  text=re.sub(r'<p\b[^>]*class=["\x27][^"\x27]*media-credit[^"\x27]*["\x27][^>]*>.*?</p>','',text,flags=re.S)
  notice=x.get('credit_notice')
  if notice:
   nurl=x.get('credit_url') or source
   credit='<p class="src media-credit">'+escape(notice).replace('{url}','<a href="'+escape(nurl,quote=True)+'">'+escape(nurl)+'</a>')+'</p>'
  else:
   credit='<p class="src media-credit">'+label+' hosted by its publisher. <a href="'+escape(source,quote=True)+'">Official source</a>. Independent guide, not affiliated or sponsored. Artwork and trademarks belong to their owners.</p>'
  if slug in ["ikea-kreativ-ai-room-design-app-india-free-guide", "indus-by-sarvam-indian-language-ai-chat-app-free-plan-guide", "intrinsic-core-open-source-robotics-ros-setup-guide", "irfanview-free-windows-image-viewer-converter-home-use-only-guide", "irisgo-free-beta-ai-learns-tasks-by-watching-windows-mac-privacy-guide", "ishan-uday-scholarship-2026-27-nsp-ugc-guide", "ixigo-tara-ai-travel-assistant-guide", "jaam-m-context-engine-enterprise-guide", "jenni-ai-academic-writing-free-limits-guide", "jetbrains-air-ides-eap-agents-costs-guide", "jio-canva-pro-12-months-free-offer-recharge-eligibility-guide", "jio-google-ai-pro-18-months-free-offer-eligibility-deadline-guide", "julius-ai-free-spreadsheet-data-analysis-guide", "k-dense-byok-local-research-assistant-guide", "kaggle-learn-free-short-courses-python-machine-learning-ai-guide", "kapwing-free-ai-auto-subtitles-video-guide", "kerala-apj-abdul-kalam-scholarship-2026-27-polytechnic-minority-students-rs-6000-guide", "kerala-minority-itc-fee-reimbursement-2026-27-rs-10000-20000-apply-by-20-november-guide", "kerala-oec-post-matric-scholarship-outside-state", "kerala-psc-130-150-2026-october7-deadline-guide", "kerala-waqf-board-loan-scholarship-2026-rs-5000-monthly-professional-students-apply-by-31-october-guide", "kerala-whatsapp-services-reported-aicon-test-guide", "kernelai-free-offline-ai-phone-app-android-ios-no-account-guide", "kerala-minority-ca-cma-cs-scholarship-2026-27-rs-15000-apply-by-25-november-guide", "lg-thinq-claw-beta-india-availability-guide", "librecad-free-open-source-2d-cad-drawing-software-windows-mac-linux-guide"]:
   credit=credit.replace('class="src media-credit"', 'class="media-credit" style="color:var(--muted);font-size:.95rem;line-height:1.6"')
  text=text.replace(img,img+credit,1)
  video=x.get('embed_url','');watch=x.get('video_url','')
  if video.startswith('https://www.youtube.com/embed/') and watch.startswith('https://'):
   title=x.get('video_title','Official publisher video');video=video.replace('www.youtube.com/embed/','www.youtube-nocookie.com/embed/')
   panel='<figure class="official-video" style="margin:24px 0"><iframe src="'+escape(video,quote=True)+'" title="'+escape(title,quote=True)+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen style="width:100%;aspect-ratio:16/9;border:0;border-radius:12px"></iframe><figcaption class="src">Official publisher video: '+escape(title)+'. <a href="'+escape(watch,quote=True)+'">Watch on YouTube</a>. Published by <a href="'+escape(x.get('video_channel_url',''),quote=True)+'">'+escape(x.get('video_channel','publisher'))+'</a>. Independent guide, not sponsored.</figcaption></figure>'
   if slug=="jenni-ai-academic-writing-free-limits-guide":panel=panel.replace('class="src"', 'class="video-credit" style="color:var(--muted);font-size:.95rem;line-height:1.6"')
   text=text.replace(credit,credit+panel,1)

  # Do not label a generic homepage asset as a picture of the feature discussed.
  for oldurl in old[:1]:
   text=text.replace(oldurl,u)
   full='https://aicon-hub.github.io/'+oldurl.replace('../','')
   text=text.replace(full,u)
  for key in ['og:image','twitter:image']:
   pat=r'<meta\b(?=[^>]*(?:name|property)=["\x27]'+key+r'["\x27])[^>]*>'
   text=re.sub(pat,'',text);text=text.replace('</head>','<meta '+('property' if key=='og:image' else 'name')+'="'+key+'" content="'+escape(u,quote=True)+'"/></head>',1)
  text=re.sub(r'<meta\b(?=[^>]*property=["\x27]og:image:(?:width|height)["\x27])[^>]*>','',text)
  # Any Article schema image must also remain on the publisher's hosting.
  text=re.sub(r'("image"\s*:\s*)"https://aicon-hub.github.io/assets/og/[^"<>]+"',lambda m:m[1]+json.dumps(u),text)
  for oldurl in old:
   if '/assets/' in oldurl:
    target=(out/oldurl.replace('../','')).resolve()
    if target.is_relative_to(out.resolve()) and target.is_file():target.unlink()
  for ext in ['.svg','.png','.jpg','.webp','.svg.b64','.png.b64']:(out/'assets/og'/(slug+ext)).unlink(missing_ok=True)
  (out/'assets/og'/(slug+'-official.png')).unlink(missing_ok=True)
  p.write_text(text);applied[slug]=dict(x,image=u)
 ledger=out/'share-metadata-audit.json'
 if ledger.exists():
  rows=json.loads(ledger.read_text())
  for row in rows:
   slug=Path(row.get('path','')).stem
   row['image']=applied[slug]['image'] if slug in applied else None
  ledger.write_text(json.dumps(rows,ensure_ascii=False,indent=2))
 return applied
