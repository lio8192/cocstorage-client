interface BlobInfo {
	id: () => string;
	name: () => string;
	filename: () => string;
	blob: () => Blob;
	base64: () => string;
	blobUri: () => string;
	uri: () => string | undefined;
}

interface UploadFailureOptions {
	remove?: boolean;
}
