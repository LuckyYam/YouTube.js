import { __awaiter } from "tslib";
/* eslint-disable tsdoc/syntax */
/** @jsxFactory DashUtils.createElement */
/** @jsxFragmentFactory DashUtils.Fragment */
import * as DashUtils from './DashUtils.js';
import { getStreamingInfo } from './StreamingInfo.js';
import { InnertubeError } from './Utils.js';
function OTFPostLiveDvrSegmentInfo(_a) {
    return __awaiter(this, arguments, void 0, function* ({ info }) {
        if (!info.is_oft && !info.is_post_live_dvr)
            return null;
        const template = yield info.getSegmentTemplate();
        return DashUtils.createElement("segment-template", { startNumber: template.init_url ? '1' : '0', timescale: "1000", initialization: template.init_url, media: template.media_url },
            DashUtils.createElement("segment-timeline", null, template.timeline.map((segment_duration) => (DashUtils.createElement("s", { d: segment_duration.duration, r: segment_duration.repeat_count })))));
    });
}
function SegmentInfo({ info }) {
    if (info.is_oft || info.is_post_live_dvr) {
        return DashUtils.createElement(OTFPostLiveDvrSegmentInfo, { info: info });
    }
    return DashUtils.createElement(DashUtils.Fragment, null,
        DashUtils.createElement("base-url", null, info.base_url),
        DashUtils.createElement("segment-base", { indexRange: `${info.index_range.start}-${info.index_range.end}` },
            DashUtils.createElement("initialization", { range: `${info.init_range.start}-${info.init_range.end}` })));
}
function DashManifest(_a) {
    return __awaiter(this, arguments, void 0, function* ({ streamingData, isPostLiveDvr, transformURL, rejectFormat, cpn, player, actions, storyboards, captionTracks, options }) {
        const { getDuration, audio_sets, video_sets, image_sets, text_sets } = getStreamingInfo(streamingData, isPostLiveDvr, transformURL, rejectFormat, cpn, player, actions, storyboards, captionTracks, options);
        // XXX: DASH spec: https://standards.iso.org/ittf/PubliclyAvailableStandards/c083314_ISO_IEC%2023009-1_2022(en).zip
        return DashUtils.createElement("mpd", { xmlns: "urn:mpeg:dash:schema:mpd:2011", minBufferTime: "PT1.500S", profiles: "urn:mpeg:dash:profile:isoff-main:2011", type: "static", mediaPresentationDuration: `PT${yield getDuration()}S`, "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation": "urn:mpeg:dash:schema:mpd:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd" },
            DashUtils.createElement("period", null,
                audio_sets.map((set, index) => (DashUtils.createElement("adaptation-set", { id: index, mimeType: set.mime_type, startWithSAP: "1", subsegmentAlignment: "true", lang: set.language, codecs: set.codecs, audioSamplingRate: set.audio_sample_rate, contentType: "audio" },
                    set.track_roles && set.track_roles.map((role) => (DashUtils.createElement("role", { schemeIdUri: "urn:mpeg:dash:role:2011", value: role }))),
                    set.track_name &&
                        DashUtils.createElement("label", { id: index }, set.track_name),
                    set.channels &&
                        DashUtils.createElement("audio-channel-configuration", { schemeIdUri: "urn:mpeg:dash:23003:3:audio_channel_configuration:2011", value: set.channels }),
                    set.representations.map((rep) => (DashUtils.createElement("representation", { id: rep.uid, bandwidth: rep.bitrate, codecs: rep.codecs, audioSamplingRate: rep.audio_sample_rate },
                        rep.channels &&
                            DashUtils.createElement("audio-channel-configuration", { schemeIdUri: "urn:mpeg:dash:23003:3:audio_channel_configuration:2011", value: rep.channels }),
                        DashUtils.createElement(SegmentInfo, { info: rep.segment_info }))))))),
                video_sets.map((set, index) => (DashUtils.createElement("adaptation-set", { id: index + audio_sets.length, mimeType: set.mime_type, startWithSAP: "1", subsegmentAlignment: "true", codecs: set.codecs, maxPlayoutRate: "1", frameRate: set.fps, contentType: "video" },
                    set.color_info.primaries &&
                        DashUtils.createElement("essential-property", { schemeIdUri: "urn:mpeg:mpegB:cicp:ColourPrimaries", value: set.color_info.primaries }),
                    set.color_info.transfer_characteristics &&
                        DashUtils.createElement("essential-property", { schemeIdUri: "urn:mpeg:mpegB:cicp:TransferCharacteristics", value: set.color_info.transfer_characteristics }),
                    set.color_info.matrix_coefficients &&
                        DashUtils.createElement("essential-property", { schemeIdUri: "urn:mpeg:mpegB:cicp:MatrixCoefficients", value: set.color_info.matrix_coefficients }),
                    set.representations.map((rep) => (DashUtils.createElement("representation", { id: rep.uid, bandwidth: rep.bitrate, width: rep.width, height: rep.height, codecs: rep.codecs, frameRate: rep.fps },
                        DashUtils.createElement(SegmentInfo, { info: rep.segment_info }))))))),
                image_sets.map((set, index) => __awaiter(this, void 0, void 0, function* () {
                    return DashUtils.createElement("adaptation-set", { id: index + audio_sets.length + video_sets.length, mimeType: yield set.getMimeType(), contentType: "image" }, set.representations.map((rep) => __awaiter(this, void 0, void 0, function* () {
                        return (DashUtils.createElement("representation", { id: `thumbnails_${rep.thumbnail_width}x${rep.thumbnail_height}`, bandwidth: yield rep.getBitrate(), width: rep.sheet_width, height: rep.sheet_height },
                            DashUtils.createElement("essential-property", { schemeIdUri: "http://dashif.org/thumbnail_tile", value: `${rep.columns}x${rep.rows}` }),
                            DashUtils.createElement("segment-template", { media: rep.template_url, duration: rep.template_duration, startNumber: "0" })));
                    })));
                })),
                text_sets.map((set, index) => {
                    return DashUtils.createElement("adaptation-set", { id: index + audio_sets.length + video_sets.length + image_sets.length, mimeType: set.mime_type, lang: set.language, contentType: "text" },
                        set.track_roles.map((role) => (DashUtils.createElement("role", { schemeIdUri: "urn:mpeg:dash:role:2011", value: role }))),
                        DashUtils.createElement("label", { id: index + audio_sets.length }, set.track_name),
                        DashUtils.createElement("representation", { id: set.representation.uid, bandwidth: "0" },
                            DashUtils.createElement("base-url", null, set.representation.base_url)));
                })));
    });
}
export function toDash(streaming_data, is_post_live_dvr = false, url_transformer = (url) => url, format_filter, cpn, player, actions, storyboards, caption_tracks, options) {
    if (!streaming_data)
        throw new InnertubeError('Streaming data not available');
    return DashUtils.renderToString(DashUtils.createElement(DashManifest, { streamingData: streaming_data, isPostLiveDvr: is_post_live_dvr, transformURL: url_transformer, options: options, rejectFormat: format_filter, cpn: cpn, player: player, actions: actions, storyboards: storyboards, captionTracks: caption_tracks }));
}
//# sourceMappingURL=DashManifest.js.map