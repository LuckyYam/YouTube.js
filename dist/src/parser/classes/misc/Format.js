var _Format_this_response_nsig_cache;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { InnertubeError } from '../../../utils/Utils.js';
class Format {
    constructor(data, this_response_nsig_cache) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        _Format_this_response_nsig_cache.set(this, void 0);
        if (this_response_nsig_cache) {
            __classPrivateFieldSet(this, _Format_this_response_nsig_cache, this_response_nsig_cache, "f");
        }
        this.itag = data.itag;
        this.mime_type = data.mimeType;
        this.is_type_otf = data.type === 'FORMAT_STREAM_TYPE_OTF';
        this.bitrate = data.bitrate;
        this.average_bitrate = data.averageBitrate;
        if (Reflect.has(data, 'width') && Reflect.has(data, 'height')) {
            this.width = parseInt(data.width);
            this.height = parseInt(data.height);
        }
        if (Reflect.has(data, 'projectionType'))
            this.projection_type = data.projectionType;
        if (Reflect.has(data, 'stereoLayout'))
            this.stereo_layout = (_a = data.stereoLayout) === null || _a === void 0 ? void 0 : _a.replace('STEREO_LAYOUT_', '');
        if (Reflect.has(data, 'initRange'))
            this.init_range = {
                start: parseInt(data.initRange.start),
                end: parseInt(data.initRange.end)
            };
        if (Reflect.has(data, 'indexRange'))
            this.index_range = {
                start: parseInt(data.indexRange.start),
                end: parseInt(data.indexRange.end)
            };
        this.last_modified = new Date(Math.floor(parseInt(data.lastModified) / 1000));
        if (Reflect.has(data, 'contentLength'))
            this.content_length = parseInt(data.contentLength);
        if (Reflect.has(data, 'quality'))
            this.quality = data.quality;
        if (Reflect.has(data, 'qualityLabel'))
            this.quality_label = data.qualityLabel;
        if (Reflect.has(data, 'fps'))
            this.fps = data.fps;
        if (Reflect.has(data, 'url'))
            this.url = data.url;
        if (Reflect.has(data, 'cipher'))
            this.cipher = data.cipher;
        if (Reflect.has(data, 'signatureCipher'))
            this.signature_cipher = data.signatureCipher;
        if (Reflect.has(data, 'audioQuality'))
            this.audio_quality = data.audioQuality;
        this.approx_duration_ms = parseInt(data.approxDurationMs);
        if (Reflect.has(data, 'audioSampleRate'))
            this.audio_sample_rate = parseInt(data.audioSampleRate);
        if (Reflect.has(data, 'audioChannels'))
            this.audio_channels = data.audioChannels;
        if (Reflect.has(data, 'loudnessDb'))
            this.loudness_db = data.loudnessDb;
        if (Reflect.has(data, 'spatialAudioType'))
            this.spatial_audio_type = (_b = data.spatialAudioType) === null || _b === void 0 ? void 0 : _b.replace('SPATIAL_AUDIO_TYPE_', '');
        if (Reflect.has(data, 'maxDvrDurationSec'))
            this.max_dvr_duration_sec = data.maxDvrDurationSec;
        if (Reflect.has(data, 'targetDurationSec'))
            this.target_duration_dec = data.targetDurationSec;
        this.has_audio = !!data.audioBitrate || !!data.audioQuality;
        this.has_video = !!data.qualityLabel;
        this.has_text = !!data.captionTrack;
        if (Reflect.has(data, 'xtags'))
            this.xtags = data.xtags;
        if (Reflect.has(data, 'fairPlayKeyUri'))
            this.fair_play_key_uri = data.fairPlayKeyUri;
        if (Reflect.has(data, 'drmFamilies'))
            this.drm_families = data.drmFamilies;
        if (Reflect.has(data, 'drmTrackType'))
            this.drm_track_type = data.drmTrackType;
        if (Reflect.has(data, 'distinctParams'))
            this.distinct_params = data.distinctParams;
        if (Reflect.has(data, 'trackAbsoluteLoudnessLkfs'))
            this.track_absolute_loudness_lkfs = data.trackAbsoluteLoudnessLkfs;
        if (Reflect.has(data, 'highReplication'))
            this.high_replication = data.highReplication;
        if (Reflect.has(data, 'colorInfo'))
            this.color_info = {
                primaries: (_c = data.colorInfo.primaries) === null || _c === void 0 ? void 0 : _c.replace('COLOR_PRIMARIES_', ''),
                transfer_characteristics: (_d = data.colorInfo.transferCharacteristics) === null || _d === void 0 ? void 0 : _d.replace('COLOR_TRANSFER_CHARACTERISTICS_', ''),
                matrix_coefficients: (_e = data.colorInfo.matrixCoefficients) === null || _e === void 0 ? void 0 : _e.replace('COLOR_MATRIX_COEFFICIENTS_', '')
            };
        if (Reflect.has(data, 'audioTrack'))
            this.audio_track = {
                audio_is_default: data.audioTrack.audioIsDefault,
                display_name: data.audioTrack.displayName,
                id: data.audioTrack.id
            };
        if (Reflect.has(data, 'captionTrack'))
            this.caption_track = {
                display_name: data.captionTrack.displayName,
                vss_id: data.captionTrack.vssId,
                language_code: data.captionTrack.languageCode,
                kind: data.captionTrack.kind,
                id: data.captionTrack.id
            };
        if (this.has_audio || this.has_text) {
            const args = new URLSearchParams(this.cipher || this.signature_cipher);
            const url_components = new URLSearchParams(args.get('url') || this.url);
            const xtags = (_f = url_components.get('xtags')) === null || _f === void 0 ? void 0 : _f.split(':');
            this.language = ((_g = xtags === null || xtags === void 0 ? void 0 : xtags.find((x) => x.startsWith('lang='))) === null || _g === void 0 ? void 0 : _g.split('=')[1]) || null;
            if (this.has_audio) {
                this.is_drc = !!data.isDrc || !!(xtags === null || xtags === void 0 ? void 0 : xtags.includes('drc=1'));
                const audio_content = (_h = xtags === null || xtags === void 0 ? void 0 : xtags.find((x) => x.startsWith('acont='))) === null || _h === void 0 ? void 0 : _h.split('=')[1];
                this.is_dubbed = audio_content === 'dubbed';
                this.is_descriptive = audio_content === 'descriptive';
                this.is_original = audio_content === 'original' || (!this.is_dubbed && !this.is_descriptive && !this.is_drc);
            }
            // Some text tracks don't have xtags while others do
            if (this.has_text && !this.language && this.caption_track) {
                this.language = this.caption_track.language_code;
            }
        }
    }
    /**
     * Deciphers the streaming url of the format.
     * @returns Deciphered URL.
     */
    decipher(player) {
        if (!player)
            throw new InnertubeError('Cannot decipher format, this session appears to have no valid player.');
        return player.decipher(this.url, this.signature_cipher, this.cipher, __classPrivateFieldGet(this, _Format_this_response_nsig_cache, "f"));
    }
}
_Format_this_response_nsig_cache = new WeakMap();
export default Format;
//# sourceMappingURL=Format.js.map